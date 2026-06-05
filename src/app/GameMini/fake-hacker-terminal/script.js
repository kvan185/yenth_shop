const terminal = document.getElementById('terminal');
const output = document.getElementById('output');
const input = document.getElementById('commandInput');

document.body.classList.add('scanline');

const fakeFiles = [
  'access.log', 'mainframe.sys', 'passwords_fake.txt', 'ghost_protocol.exe',
  'matrix.config', 'secret-not-real.db', 'readme.md'
];

const commands = {
  help: `Danh sách lệnh:\n  help       Hiện danh sách lệnh\n  scan       Quét hệ thống giả lập\n  hack       Chạy hiệu ứng hack giả lập\n  status     Xem trạng thái hệ thống\n  ls         Xem file giả lập\n  clear      Xóa màn hình\n  about      Giới thiệu`,
  about: 'Fake Hacker Terminal - web app vui để luyện HTML/CSS/JS. Không thực hiện bất kỳ hành động xâm nhập thật nào.',
  status: 'STATUS: ONLINE\nCPU: 13%\nRAM: 42%\nSECURITY: SIMULATION MODE\nNETWORK: LOCAL ONLY',
  ls: fakeFiles.join('\n')
};

function printLine(text = '', className = 'line') {
  const div = document.createElement('div');
  div.className = className;
  div.textContent = text;
  output.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
}

function typeLines(lines, delay = 180, done) {
  let i = 0;
  const timer = setInterval(() => {
    printLine(lines[i], lines[i].includes('FAILED') ? 'line error' : 'line success');
    i++;
    if (i >= lines.length) {
      clearInterval(timer);
      if (done) done();
    }
  }, delay);
}

function runScan() {
  typeLines([
    '[+] Initializing fake scanner...',
    '[+] Checking local terminal shell...',
    '[+] Reading simulated packets...',
    '[+] Finding imaginary vulnerabilities...',
    '[!] CVE-0000-FAKE detected: too much caffeine',
    '[+] Scan completed. No real system was touched.'
  ], 350);
}

function runHack() {
  typeLines([
    '[+] Connecting to cinematic mainframe...',
    '[+] Bypassing firewall animation...',
    '[+] Cracking fake password: ********',
    '[+] Injecting harmless green pixels...',
    '[+] ACCESS GRANTED... just kidding 😎',
    '[+] Simulation finished safely.'
  ], 330);
}

function handleCommand(raw) {
  const command = raw.trim().toLowerCase();
  printLine(`root@fake-terminal:~$ ${raw}`, 'line command');

  if (!command) return;
  if (command === 'clear') {
    output.innerHTML = '';
    return;
  }
  if (command === 'scan') return runScan();
  if (command === 'hack') return runHack();
  if (commands[command]) return printLine(commands[command]);

  printLine(`Command not found: ${command}. Gõ help để xem lệnh.`, 'line error');
}

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleCommand(input.value);
    input.value = '';
  }
});

document.addEventListener('click', () => input.focus());

// Matrix rain
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const letters = 'アイウエオカキクケコサシスセソ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ff66';
  ctx.font = `${fontSize}px monospace`;

  columns = Math.floor(canvas.width / fontSize);
  if (drops.length !== columns) drops = Array(columns).fill(1);

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

setInterval(drawMatrix, 45);
printLine('System ready. Type help to begin.', 'line success');
