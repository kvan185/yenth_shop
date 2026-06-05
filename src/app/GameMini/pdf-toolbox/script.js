const { PDFDocument, degrees } = PDFLib;

function setStatus(text) {
  document.getElementById('status').textContent = text;
}

function makeDownload(bytes, filename) {
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  document.getElementById('output').innerHTML = `<a href="${url}" download="${filename}">Tải xuống ${filename}</a>`;
}

async function readFile(file) {
  return await file.arrayBuffer();
}

function parsePageRange(range, maxPages) {
  const result = new Set();
  range.split(',').map(x => x.trim()).filter(Boolean).forEach(part => {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      for (let i = start; i <= end; i++) if (i >= 1 && i <= maxPages) result.add(i - 1);
    } else {
      const page = Number(part);
      if (page >= 1 && page <= maxPages) result.add(page - 1);
    }
  });
  return [...result];
}

async function mergePDFs() {
  const files = [...document.getElementById('mergeFiles').files];
  if (!files.length) return alert('Vui lòng chọn ít nhất 2 file PDF.');
  setStatus('Đang gộp PDF...');
  const merged = await PDFDocument.create();
  for (const file of files) {
    const src = await PDFDocument.load(await readFile(file));
    const pages = await merged.copyPages(src, src.getPageIndices());
    pages.forEach(p => merged.addPage(p));
  }
  makeDownload(await merged.save(), 'merged.pdf');
  setStatus('Đã gộp PDF thành công.');
}

async function splitPDF() {
  const file = document.getElementById('splitFile').files[0];
  const range = document.getElementById('pageRange').value;
  if (!file || !range) return alert('Vui lòng chọn PDF và nhập trang cần tách.');
  setStatus('Đang tách PDF...');
  const src = await PDFDocument.load(await readFile(file));
  const pagesToCopy = parsePageRange(range, src.getPageCount());
  if (!pagesToCopy.length) return alert('Không tìm thấy trang hợp lệ.');
  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, pagesToCopy);
  pages.forEach(p => out.addPage(p));
  makeDownload(await out.save(), 'split.pdf');
  setStatus('Đã tách PDF thành công.');
}

async function rotatePDF() {
  const file = document.getElementById('rotateFile').files[0];
  const degree = Number(document.getElementById('rotateDegree').value);
  if (!file) return alert('Vui lòng chọn PDF cần xoay.');
  setStatus('Đang xoay PDF...');
  const pdf = await PDFDocument.load(await readFile(file));
  pdf.getPages().forEach(page => page.setRotation(degrees(degree)));
  makeDownload(await pdf.save(), 'rotated.pdf');
  setStatus('Đã xoay PDF thành công.');
}

async function imagesToPDF() {
  const files = [...document.getElementById('imageFiles').files];
  if (!files.length) return alert('Vui lòng chọn ảnh JPG hoặc PNG.');
  setStatus('Đang chuyển ảnh sang PDF...');
  const pdf = await PDFDocument.create();
  for (const file of files) {
    const bytes = await readFile(file);
    const image = file.type.includes('png') ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
    const page = pdf.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  }
  makeDownload(await pdf.save(), 'images-to-pdf.pdf');
  setStatus('Đã chuyển ảnh sang PDF thành công.');
}
