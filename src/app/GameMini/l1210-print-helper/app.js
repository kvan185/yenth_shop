const fileInput = document.getElementById("fileInput");
const fileInfo = document.getElementById("fileInfo");
const pageRangeInput = document.getElementById("pageRange");
const preview = document.getElementById("preview");
const statusEl = document.getElementById("status");
const downloadLink = document.getElementById("downloadLink");
const prepareBtn = document.getElementById("prepareBtn");
const continueBtn = document.getElementById("continueBtn");
const planBox = document.getElementById("planBox");
const duplexOptions = document.getElementById("duplexOptions");
const firstPassModeSelect = document.getElementById("firstPassMode");

let currentFile = null;
let currentUrl = null;
let processedUrl = null;
let pdfBytes = null;
let printJob = null;

function isPdfFile(file) {
  return Boolean(
    file &&
      (file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf"))
  );
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#b42318" : "#667085";
}

function revokeProcessed() {
  if (processedUrl) {
    URL.revokeObjectURL(processedUrl);
  }

  processedUrl = null;
  downloadLink.classList.add("hidden");
}

function resetPrintJob() {
  printJob = null;
  continueBtn.classList.add("hidden");
  planBox.classList.add("hidden");
  planBox.textContent = "";
}

function showBlob(blob, filename) {
  revokeProcessed();
  processedUrl = URL.createObjectURL(blob);
  preview.src = processedUrl;
  downloadLink.href = processedUrl;
  downloadLink.download = filename;
  downloadLink.classList.remove("hidden");
}

function showPlan(message) {
  planBox.textContent = message;
  planBox.classList.remove("hidden");
}

function getSelectedPrintMode() {
  return document.querySelector('input[name="printMode"]:checked').value;
}

function syncPrintMode() {
  const isDuplex = getSelectedPrintMode() === "duplex";
  duplexOptions.classList.toggle("hidden", !isDuplex);
}

function printPreview() {
  const target = preview.contentWindow;

  if (target) {
    target.focus();
    target.print();
    return;
  }

  window.print();
}

function requirePdf() {
  if (!currentFile) {
    throw new Error("Ban chua chon file.");
  }

  if (!isPdfFile(currentFile)) {
    throw new Error("Che do nay chi ap dung cho file PDF.");
  }
}

async function ensurePdfBytes() {
  requirePdf();

  if (!window.PDFLib) {
    throw new Error(
      "Khong tai duoc thu vien PDF. Hay mo app khi co Internet lan dau."
    );
  }

  if (!pdfBytes) {
    pdfBytes = await currentFile.arrayBuffer();
  }

  return pdfBytes;
}

async function loadPdfDocument() {
  const bytes = await ensurePdfBytes();
  return PDFLib.PDFDocument.load(bytes);
}

function parseRangePart(part, maxPage) {
  const trimmed = part.trim();

  if (!trimmed) {
    return [];
  }

  if (/^\d+$/.test(trimmed)) {
    const page = Number(trimmed);
    if (page < 1 || page > maxPage) {
      throw new Error(`Trang ${page} nam ngoai tong so trang (${maxPage}).`);
    }
    return [page];
  }

  const match = trimmed.match(/^(\d+)\s*-\s*(\d+)$/);
  if (!match) {
    throw new Error(`Khong hieu khoang trang "${trimmed}".`);
  }

  const start = Number(match[1]);
  const end = Number(match[2]);

  if (start < 1 || end < 1 || start > maxPage || end > maxPage) {
    throw new Error(`Khoang "${trimmed}" nam ngoai tong so trang (${maxPage}).`);
  }

  if (start > end) {
    throw new Error(`Khoang "${trimmed}" can co so dau nho hon hoac bang so cuoi.`);
  }

  const pages = [];
  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }
  return pages;
}

function parsePageRange(rangeText, maxPage) {
  const text = rangeText.trim();

  if (!text) {
    return Array.from({ length: maxPage }, (_, index) => index + 1);
  }

  const pages = [];
  const seen = new Set();

  for (const part of text.split(",")) {
    const partPages = parseRangePart(part, maxPage);
    for (const page of partPages) {
      if (!seen.has(page)) {
        seen.add(page);
        pages.push(page);
      }
    }
  }

  if (!pages.length) {
    throw new Error("Ban chua nhap trang can in.");
  }

  return pages.sort((a, b) => a - b);
}

function splitDuplexPages(selectedPages, firstPassMode) {
  const oddPages = selectedPages.filter((page) => page % 2 === 1);
  const evenPages = selectedPages.filter((page) => page % 2 === 0);

  if (firstPassMode === "odd") {
    return {
      firstLabel: "trang le",
      secondLabel: "trang chan",
      firstPages: [...oddPages].reverse(),
      secondPages: evenPages,
    };
  }

  return {
    firstLabel: "trang chan",
    secondLabel: "trang le",
    firstPages: [...evenPages].reverse(),
    secondPages: oddPages,
  };
}

async function buildPdfFromPages(pageNumbers, suffix) {
  const src = await loadPdfDocument();
  const out = await PDFLib.PDFDocument.create();
  const pageIndexes = pageNumbers.map((page) => page - 1);

  if (pageIndexes.length) {
    const copiedPages = await out.copyPages(src, pageIndexes);
    copiedPages.forEach((page) => out.addPage(page));
  } else {
    out.addPage([595.28, 841.89]);
  }

  const bytes = await out.save();
  const filename = `${currentFile.name.replace(/\.pdf$/i, "")}-${suffix}.pdf`;

  return {
    blob: new Blob([bytes], { type: "application/pdf" }),
    filename,
  };
}

async function previewPass(pass) {
  const { blob, filename } = await buildPdfFromPages(pass.pages, pass.suffix);
  showBlob(blob, filename);
  setStatus(
    `Da mo ${pass.label} (${pass.pages.length} trang). Bam "In file dang xem" de in.`
  );
}

function describePages(pages) {
  return pages.length ? pages.join(", ") : "khong co trang nao";
}

async function prepareSingleSided(selectedPages) {
  const pass = {
    label: "ban in 1 mat",
    suffix: "in-1-mat",
    pages: selectedPages,
  };

  await previewPass(pass);
  showPlan(
    `Ban in 1 mat\n` +
      `Trang se in: ${describePages(selectedPages)}\n` +
      `So to du kien: ${selectedPages.length}\n` +
      `Chi can bam "In file dang xem".`
  );
}

async function prepareDuplex(selectedPages, firstPassMode) {
  const split = splitDuplexPages(selectedPages, firstPassMode);

  printJob = {
    firstPass: {
      label: `luot 1 - ${split.firstLabel}`,
      suffix: `luot-1-${firstPassMode}`,
      pages: split.firstPages,
    },
    secondPass: {
      label: `luot 2 - ${split.secondLabel}`,
      suffix: `luot-2-${firstPassMode === "odd" ? "even" : "odd"}`,
      pages: split.secondPages,
    },
    sheetCount: Math.max(split.firstPages.length, split.secondPages.length),
    currentStep: 1,
  };

  await previewPass(printJob.firstPass);
  continueBtn.classList.remove("hidden");

  const firstText = describePages(printJob.firstPass.pages);
  const secondText = describePages(printJob.secondPass.pages);

  showPlan(
    `Ban in 2 mat thu cong\n` +
      `Luot 1: ${split.firstLabel} -> ${firstText}\n` +
      `Luot 2: ${split.secondLabel} -> ${secondText}\n` +
      `So to du kien: ${printJob.sheetCount}\n` +
      `Thu tu nay da doi lai de bo giay cuoi cung co trang 1 nam tren, ke ca khi co so trang le nhu 11 trang. Sau khi in luot 1, doi dau giay roi bam "Toi da doi dau giay, tiep tuc".`
  );
}

async function preparePrintJob() {
  try {
    resetPrintJob();
    setStatus("Dang phan tich file...");

    if (!currentFile) {
      throw new Error("Ban chua chon file.");
    }

    if (!isPdfFile(currentFile)) {
      if (getSelectedPrintMode() === "duplex") {
        throw new Error("In 2 mat tu dong hien chi ho tro PDF.");
      }

      preview.src = currentUrl;
      showPlan(
        `Ban in theo trinh duyet\n` +
          `File hien tai khong can xu ly them.\n` +
          `Chi can bam "In file dang xem" de mo hop thoai in.`
      );
      setStatus("File nay se in nhu tren trinh duyet. Bam \"In file dang xem\" de tiep tuc.");
      return;
    }

    const src = await loadPdfDocument();
    const totalPages = src.getPageCount();
    const selectedPages = parsePageRange(pageRangeInput.value, totalPages);
    const printMode = getSelectedPrintMode();

    if (printMode === "single") {
      await prepareSingleSided(selectedPages);
      return;
    }

    await prepareDuplex(selectedPages, firstPassModeSelect.value);
  } catch (error) {
    setStatus(error.message, true);
  }
}

async function continueDuplexPrint() {
  if (!printJob) {
    setStatus("Chua co luot in 2 mat nao dang cho tiep tuc.", true);
    return;
  }

  try {
    if (printJob.currentStep === 1) {
      await previewPass(printJob.secondPass);
      printJob.currentStep = 2;
      continueBtn.classList.add("hidden");
      showPlan(
        `Dang o luot 2\n` +
          `Trang se in: ${describePages(printJob.secondPass.pages)}\n` +
          `Bam "In file dang xem" de in mat con lai. Sau khi in xong, bo giay se ra theo dung thu tu da chon.`
      );
      return;
    }

    setStatus("Da den luot cuoi. Ban chi can in file dang xem.", false);
  } catch (error) {
    setStatus(error.message, true);
  }
}

fileInput.addEventListener("change", async () => {
  currentFile = fileInput.files[0];
  pdfBytes = null;
  resetPrintJob();
  revokeProcessed();

  if (currentUrl) {
    URL.revokeObjectURL(currentUrl);
  }

  if (!currentFile) {
    fileInfo.textContent = "Chua chon file.";
    preview.removeAttribute("src");
    setStatus("San sang.");
    return;
  }

  currentUrl = URL.createObjectURL(currentFile);
  preview.src = currentUrl;
  fileInfo.textContent = `${currentFile.name} - ${(currentFile.size / 1024 / 1024).toFixed(2)} MB`;

  try {
    if (!isPdfFile(currentFile)) {
      pageRangeInput.value = "";
      pageRangeInput.placeholder = "Chi can cho PDF, vi du: 1-10";
      setStatus("Da nap file. Ban co the in truc tiep nhu tren trinh duyet.");
      return;
    }

    const src = await loadPdfDocument();
    const totalPages = src.getPageCount();
    pageRangeInput.placeholder = `Vi du: 1-${totalPages}`;
    setStatus(`Da nap file PDF ${totalPages} trang. Nhap khoang trang va chon che do in.`);
  } catch (error) {
    setStatus(error.message, true);
  }
});

document.getElementById("printBtn").addEventListener("click", printPreview);
prepareBtn.addEventListener("click", preparePrintJob);
continueBtn.addEventListener("click", continueDuplexPrint);
document
  .querySelectorAll('input[name="printMode"]')
  .forEach((input) => input.addEventListener("change", syncPrintMode));

syncPrintMode();
