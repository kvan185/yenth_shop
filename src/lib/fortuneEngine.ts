export type FortuneInput = {
  name: string;
  birthDate: string;
  birthHour: string;
  partnerBirthDate?: string;
  purpose?: string;
};

export type FortuneReading = {
  zodiacSign: string;
  zodiacElement: string;
  animal: string;
  heavenlyStem: string;
  earthlyBranch: string;
  canChi: string;
  napAm: string;
  yearElement: string;
  lunarYearNote: string;
  hourBranch: string;
  luckyNumber: number;
  luckyColor: string;
  goodDay: string;
  focus: string;
  love: string;
  money: string;
  career: string;
  health: string;
  compatibility: string;
  monthlyPreview: string[];
  premiumOutline: string[];
  aiPrompt: string;
  dataSources: string[];
};

const zodiacSigns = [
  { label: 'Ma Kết', element: 'Đất', from: [12, 22], to: [1, 19] },
  { label: 'Bảo Bình', element: 'Khí', from: [1, 20], to: [2, 18] },
  { label: 'Song Ngư', element: 'Nước', from: [2, 19], to: [3, 20] },
  { label: 'Bạch Dương', element: 'Lửa', from: [3, 21], to: [4, 19] },
  { label: 'Kim Ngưu', element: 'Đất', from: [4, 20], to: [5, 20] },
  { label: 'Song Tử', element: 'Khí', from: [5, 21], to: [6, 20] },
  { label: 'Cự Giải', element: 'Nước', from: [6, 21], to: [7, 22] },
  { label: 'Sư Tử', element: 'Lửa', from: [7, 23], to: [8, 22] },
  { label: 'Xử Nữ', element: 'Đất', from: [8, 23], to: [9, 22] },
  { label: 'Thiên Bình', element: 'Khí', from: [9, 23], to: [10, 22] },
  { label: 'Bọ Cạp', element: 'Nước', from: [10, 23], to: [11, 21] },
  { label: 'Nhân Mã', element: 'Lửa', from: [11, 22], to: [12, 21] },
] as const;

const stems = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'] as const;
const branches = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'] as const;
const animals = ['Chuột', 'Trâu', 'Hổ', 'Mèo', 'Rồng', 'Rắn', 'Ngựa', 'Dê', 'Khỉ', 'Gà', 'Chó', 'Heo'] as const;
const elements = ['Kim', 'Thủy', 'Mộc', 'Hỏa', 'Thổ'] as const;
const colors: Record<string, string> = {
  Kim: 'trắng ngà',
  Thủy: 'xanh biển',
  Mộc: 'xanh lá',
  Hỏa: 'đỏ rượu',
  Thổ: 'vàng mật ong',
};

function getZodiacSign(month: number, day: number) {
  return zodiacSigns.find((sign) => {
    const [fromMonth, fromDay] = sign.from;
    const [toMonth, toDay] = sign.to;
    if (fromMonth > toMonth) {
      return (month === fromMonth && day >= fromDay) || (month === toMonth && day <= toDay);
    }
    return (month === fromMonth && day >= fromDay) || (month === toMonth && day <= toDay) || (month > fromMonth && month < toMonth);
  }) ?? zodiacSigns[0];
}

function getYearProfile(year: number) {
  const stem = stems[((year - 4) % 10 + 10) % 10];
  const branchIndex = ((year - 4) % 12 + 12) % 12;
  const branch = branches[branchIndex];
  const element = elements[((year + branchIndex) % elements.length + elements.length) % elements.length];
  return {
    stem,
    branch,
    canChi: `${stem} ${branch}`,
    animal: animals[branchIndex],
    element,
    napAm: `${element} cục`,
  };
}

function estimateLunarYear(date: Date) {
  const beforeApproxTet = date.getMonth() === 0 && date.getDate() < 25;
  return {
    lunarYear: beforeApproxTet ? date.getFullYear() - 1 : date.getFullYear(),
    note: beforeApproxTet
      ? 'Ngày sinh nằm trước mốc Tết ước tính 25/01, hệ thống tạm tính theo năm âm lịch trước.'
      : 'Hệ thống tạm tính năm âm lịch theo năm dương; bản nâng cao có thể gắn lịch tiết khí chính xác hơn.',
  };
}

function getHourBranch(hourText: string) {
  const hour = Number(hourText.split(':')[0] || 0);
  const index = Math.floor(((hour + 1) % 24) / 2);
  return branches[index] ?? 'Tý';
}

function buildMonthlyPreview(seed: number) {
  const themes = [
    'dọn lại tiền bạc và cắt bớt khoản chi rò rỉ',
    'mở lời, hẹn gặp hoặc làm rõ một mối quan hệ',
    'ưu tiên sức khỏe, giấc ngủ và nhịp sinh hoạt',
    'có cơ hội công việc qua người quen hoặc khách cũ',
    'học thêm kỹ năng và nâng hình ảnh cá nhân',
    'giữ tiền mặt trước cam kết lớn',
    'tốt cho hợp tác, ký kết hoặc làm lại thương hiệu cá nhân',
    'tránh tranh luận nóng, ưu tiên quan sát dữ kiện',
    'mở rộng nội dung, kênh bán hàng hoặc tệp khách mới',
    'hoàn thiện giấy tờ, hợp đồng và các việc còn treo',
    'có vận quý nhân, nên chủ động nhắn lại người từng hỗ trợ',
    'tổng kết vòng cũ và chuẩn bị kế hoạch mới',
  ];
  return Array.from({ length: 12 }, (_, offset) => `Tháng ${offset + 1}: ${themes[(seed + offset) % themes.length]}.`);
}

export function scoreCompatibility(firstDate: string, secondDate: string) {
  const first = new Date(`${firstDate}T00:00`);
  const second = new Date(`${secondDate}T00:00`);
  const diff = Math.abs(first.getFullYear() - second.getFullYear());
  const score = Math.max(54, 92 - (diff % 9) * 4);
  return {
    score,
    label: `${getYearProfile(first.getFullYear()).canChi} và ${getYearProfile(second.getFullYear()).canChi}`,
    summary: score >= 80
      ? 'Hai tuổi có nhiều điểm dễ hòa nhịp, hợp bàn chuyện dài hạn nếu giao tiếp rõ ràng.'
      : 'Có duyên bổ trợ, nhưng nên thống nhất cách quản lý tiền bạc và kỳ vọng.',
  };
}

export function pickAuspiciousDays(year: number, month: number, purpose = 'khai trương') {
  return Array.from({ length: 5 }, (_, index) => {
    const day = 4 + index * 5 + ((year + month + index) % 3);
    return {
      date: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`,
      score: 72 + ((year + month + day) % 22),
      note: `Hợp ${purpose}, ưu tiên giờ sáng và chuẩn bị giấy tờ trước một ngày.`,
    };
  });
}

export function buildTodayFortunes(year = new Date().getFullYear()) {
  return branches.map((branch, index) => ({
    branch,
    animal: animals[index],
    title: `Tuổi ${branch}`,
    summary: 'Hôm nay nên tập trung một việc chính, tránh phân tán năng lượng.',
    luckyNumber: ((year + index) % 9) + 1,
  }));
}

export function buildFortuneReading(inputOrName: FortuneInput | string, birthDate?: string, birthHour?: string): FortuneReading {
  const input: FortuneInput =
    typeof inputOrName === 'string'
      ? { name: inputOrName, birthDate: birthDate ?? '1998-08-18', birthHour: birthHour ?? '09:00' }
      : inputOrName;
  const date = new Date(`${input.birthDate}T${input.birthHour || '00:00'}`);
  const safeDate = Number.isNaN(date.getTime()) ? new Date('1998-08-18T09:00') : date;
  const { lunarYear, note } = estimateLunarYear(safeDate);
  const profile = getYearProfile(lunarYear);
  const zodiac = getZodiacSign(safeDate.getMonth() + 1, safeDate.getDate());
  const seed = [...`${input.name}${input.birthDate}${input.birthHour}${input.purpose ?? ''}`].reduce((total, char) => total + char.charCodeAt(0), 0);
  const luckyNumber = ((seed + lunarYear + safeDate.getDate()) % 9) + 1;

  return {
    zodiacSign: zodiac.label,
    zodiacElement: zodiac.element,
    animal: profile.animal,
    heavenlyStem: profile.stem,
    earthlyBranch: profile.branch,
    canChi: profile.canChi,
    napAm: profile.napAm,
    yearElement: profile.element,
    lunarYearNote: note,
    hourBranch: getHourBranch(input.birthHour),
    luckyNumber,
    luckyColor: colors[profile.element],
    goodDay: luckyNumber % 2 ? 'thứ Ba' : 'thứ Sáu',
    focus: `Nên tập trung vào việc có thể tạo kết quả nhỏ nhưng chắc; tuổi ${profile.branch} hợp cách làm rõ mục tiêu trước khi mở rộng.`,
    love: 'Tình cảm tốt hơn khi nói rõ nhu cầu thay vì thử lòng. Một tin nhắn đúng lúc có thể mở lại cảm giác gần gũi.',
    money: 'Tài lộc hợp với cách giữ kỷ luật: tách tiền dự phòng, cắt khoản chi cảm xúc và chỉ đầu tư khi vai trò rõ ràng.',
    career: 'Công việc có tín hiệu tốt nếu bạn chủ động đề xuất, chốt việc thành đầu mục nhỏ và giữ lời hứa đúng hạn.',
    health: 'Nên ngủ đều, uống đủ nước và giảm quyết định lớn khi tinh thần đang mệt. Năng lượng lên nhanh khi lịch sinh hoạt gọn lại.',
    compatibility: input.partnerBirthDate
      ? scoreCompatibility(input.birthDate, input.partnerBirthDate).summary
      : 'Chưa nhập ngày sinh người còn lại. Có thể mở công cụ xem hợp tuổi để luận sâu hơn.',
    monthlyPreview: buildMonthlyPreview(seed),
    premiumOutline: [
      'Tổng quan 12 tháng theo mệnh và cung hoàng đạo',
      'Bảng tháng thuận và tháng cần lưu ý cho tình duyên, tài chính, sự nghiệp',
      'Checklist ngày nên hành động và ngày nên chậm lại',
      'Gợi ý màu sắc, vật phẩm, lời khuyên giao tiếp và kế hoạch cá nhân',
      'Bản PDF có mã đơn hàng để chăm sóc lại qua Zalo/email',
    ],
    aiPrompt: `Viết luận giải tử vi cho ${input.name}, ${profile.canChi}, nạp âm ${profile.napAm}, cung ${zodiac.label}, giờ ${getHourBranch(input.birthHour)}.`,
    dataSources: [
      'Bảng 12 cung hoàng đạo theo ngày sinh dương lịch',
      'Bảng Can Chi theo năm âm lịch ước tính',
      'Bảng nạp âm rút gọn cho bản trải nghiệm',
      'Bảng giờ sinh quy đổi 12 địa chi',
      'Bộ template luận giải theo cung, ngũ hành và con giáp',
    ],
  };
}
