const form = document.getElementById('qrForm');
const accountNo = document.getElementById('accountNo');
const accountName = document.getElementById('accountName');
const amount = document.getElementById('amount');
const addInfo = document.getElementById('addInfo');
const template = document.getElementById('template');
const qrImage = document.getElementById('qrImage');
const qrLink = document.getElementById('qrLink');
const placeholder = document.getElementById('placeholder');
const copyBtn = document.getElementById('copyBtn');
const openBtn = document.getElementById('openBtn');

const MB_BANK_ID = '970422';

function cleanNumber(value) {
  return value.replace(/[^0-9]/g, '');
}

function normalizeTransferText(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

function formatVndInput(input) {
  const raw = cleanNumber(input.value);
  input.value = raw ? Number(raw).toLocaleString('vi-VN') : '';
}

amount.addEventListener('input', () => formatVndInput(amount));
accountNo.addEventListener('input', () => {
  accountNo.value = cleanNumber(accountNo.value);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const stk = cleanNumber(accountNo.value);
  const money = cleanNumber(amount.value);
  const content = normalizeTransferText(addInfo.value);
  const name = normalizeTransferText(accountName.value).toUpperCase();

  if (stk.length < 6 || stk.length > 19) {
    alert('Số tài khoản phải từ 6 đến 19 chữ số.');
    return;
  }

  if (!money || Number(money) <= 0) {
    alert('Số tiền phải lớn hơn 0.');
    return;
  }

  if (!content) {
    alert('Vui lòng nhập nội dung chuyển khoản.');
    return;
  }

  const baseUrl = `https://img.vietqr.io/image/${MB_BANK_ID}-${stk}-${template.value}.png`;
  const params = new URLSearchParams({
    amount: money,
    addInfo: content,
  });

  if (name) {
    params.set('accountName', name);
  }

  const finalUrl = `${baseUrl}?${params.toString()}`;

  qrImage.src = finalUrl;
  qrImage.style.display = 'block';
  placeholder.style.display = 'none';
  qrLink.value = finalUrl;
  copyBtn.disabled = false;
  openBtn.classList.remove('disabled');
  openBtn.href = finalUrl;
});

copyBtn.addEventListener('click', async () => {
  if (!qrLink.value) return;

  try {
    await navigator.clipboard.writeText(qrLink.value);
    copyBtn.textContent = 'Đã copy!';
    setTimeout(() => (copyBtn.textContent = 'Copy link QR'), 1500);
  } catch (error) {
    qrLink.select();
    document.execCommand('copy');
    copyBtn.textContent = 'Đã copy!';
    setTimeout(() => (copyBtn.textContent = 'Copy link QR'), 1500);
  }
});
