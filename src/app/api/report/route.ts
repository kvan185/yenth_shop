import { NextResponse } from 'next/server';
import { buildFortuneReading } from '@/lib/fortuneEngine';

export async function POST(request: Request) {
  const body = (await request.json()) as { name: string; birthDate: string; birthHour: string };
  const reading = buildFortuneReading(body);
  const orderId = `YTV-${Date.now().toString(36).toUpperCase()}`;

  return NextResponse.json({
    orderId,
    price: 48000,
    payment: {
      method: 'VietQR mock',
      bank: 'MB Bank',
      account: '0123456789',
      accountName: 'YENTH TU VI',
      content: `${orderId} ${body.name}`,
    },
    report: {
      title: `Báo cáo tử vi 12 tháng cho ${body.name}`,
      summary: `${reading.canChi}, nạp âm ${reading.napAm}, cung ${reading.zodiacSign}.`,
      sections: reading.premiumOutline,
      months: reading.monthlyPreview,
      aiPrompt: reading.aiPrompt,
    },
  });
}
