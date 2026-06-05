const video = document.getElementById('video');
const sourceCanvas = document.getElementById('sourceCanvas');
const resultCanvas = document.getElementById('resultCanvas');
const startCamera = document.getElementById('startCamera');
const capture = document.getElementById('capture');
const fileInput = document.getElementById('fileInput');
const processBtn = document.getElementById('process');
const addPage = document.getElementById('addPage');
const downloadPDF = document.getElementById('downloadPDF');
const brightness = document.getElementById('brightness');
const contrast = document.getElementById('contrast');
const bw = document.getElementById('bw');
const pageSize = document.getElementById('pageSize');
const pagesDiv = document.getElementById('pages');

let stream = null;
let scannedPages = [];
let hasSource = false;
let hasResult = false;

startCamera.onclick = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
    video.srcObject = stream;
    capture.disabled = false;
  } catch (err) {
    alert('Không mở được camera. Hãy cấp quyền camera hoặc dùng chức năng chọn ảnh.');
  }
};

capture.onclick = () => {
  if (!video.videoWidth) return;
  sourceCanvas.width = video.videoWidth;
  sourceCanvas.height = video.videoHeight;
  sourceCanvas.getContext('2d').drawImage(video, 0, 0);
  hasSource = true;
  processBtn.disabled = false;
};

fileInput.onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => {
    const maxW = 1600;
    const ratio = Math.min(1, maxW / img.width);
    sourceCanvas.width = img.width * ratio;
    sourceCanvas.height = img.height * ratio;
    sourceCanvas.getContext('2d').drawImage(img, 0, 0, sourceCanvas.width, sourceCanvas.height);
    hasSource = true;
    processBtn.disabled = false;
  };
  img.src = URL.createObjectURL(file);
};

function clamp(v) { return Math.max(0, Math.min(255, v)); }

function processImage() {
  if (!hasSource) return;
  const src = sourceCanvas.getContext('2d');
  const w = sourceCanvas.width;
  const h = sourceCanvas.height;
  resultCanvas.width = w;
  resultCanvas.height = h;
  const out = resultCanvas.getContext('2d');
  const imgData = src.getImageData(0, 0, w, h);
  const data = imgData.data;
  const b = Number(brightness.value);
  const c = Number(contrast.value);
  const factor = (259 * (c + 255)) / (255 * (259 - c));

  for (let i = 0; i < data.length; i += 4) {
    let r = clamp(factor * (data[i] - 128) + 128 + b);
    let g = clamp(factor * (data[i+1] - 128) + 128 + b);
    let bl = clamp(factor * (data[i+2] - 128) + 128 + b);
    if (bw.checked) {
      const gray = 0.299 * r + 0.587 * g + 0.114 * bl;
      const val = gray > 155 ? 255 : gray < 95 ? 0 : gray;
      r = g = bl = val;
    }
    data[i] = r; data[i+1] = g; data[i+2] = bl;
  }
  out.putImageData(imgData, 0, 0);
  hasResult = true;
  addPage.disabled = false;
}

processBtn.onclick = processImage;
brightness.oninput = () => hasSource && processImage();
contrast.oninput = () => hasSource && processImage();
bw.onchange = () => hasSource && processImage();

addPage.onclick = () => {
  if (!hasResult) return;
  const dataUrl = resultCanvas.toDataURL('image/jpeg', 0.92);
  scannedPages.push(dataUrl);
  renderPages();
  downloadPDF.disabled = scannedPages.length === 0;
};

function renderPages() {
  pagesDiv.innerHTML = '';
  scannedPages.forEach((src, index) => {
    const item = document.createElement('div');
    item.className = 'pageItem';
    item.innerHTML = `<strong>Trang ${index + 1}</strong><img src="${src}"><button>Xoá</button>`;
    item.querySelector('button').onclick = () => {
      scannedPages.splice(index, 1);
      renderPages();
      downloadPDF.disabled = scannedPages.length === 0;
    };
    pagesDiv.appendChild(item);
  });
}

downloadPDF.onclick = async () => {
  if (!scannedPages.length) return;
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ unit: 'mm', format: pageSize.value });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < scannedPages.length; i++) {
    if (i > 0) pdf.addPage();
    const img = new Image();
    img.src = scannedPages[i];
    await new Promise(resolve => img.onload = resolve);
    const ratio = Math.min((pageW - 16) / img.width, (pageH - 16) / img.height);
    const w = img.width * ratio;
    const h = img.height * ratio;
    const x = (pageW - w) / 2;
    const y = (pageH - h) / 2;
    pdf.addImage(scannedPages[i], 'JPEG', x, y, w, h);
  }
  pdf.save('scan-document.pdf');
};
