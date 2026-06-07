'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

const goals = [
  {
    id: 'lead',
    label: 'Khách liên hệ',
    packageName: 'Tăng trưởng',
    template: '/landing-page-dich-vu/mau_1',
    reason: 'Phù hợp khi bạn cần một trang tập trung vào gọi, Zalo, form tư vấn hoặc đặt lịch.',
  },
  {
    id: 'shop',
    label: 'Bán sản phẩm',
    packageName: 'Tăng trưởng',
    template: '/web-ban-hang-don-gian-cho-doanh-nghiep-nho/mau_2',
    reason: 'Phù hợp khi cần trình bày sản phẩm, chính sách, bằng chứng và nút hỏi mua nhanh.',
  },
  {
    id: 'profile',
    label: 'Hồ sơ tin cậy',
    packageName: 'Cơ bản',
    template: '/web-portfolio-ca-nhan/mau_1',
    reason: 'Phù hợp cho cá nhân, chuyên gia hoặc doanh nghiệp nhỏ cần một hồ sơ online rõ ràng.',
  },
  {
    id: 'system',
    label: 'Chức năng riêng',
    packageName: 'Theo yêu cầu',
    template: '/web-chuc-nang-rieng/mau_1',
    reason: 'Phù hợp khi website cần quản lý dữ liệu, form nhiều bước, đặt lịch hoặc tích hợp hệ thống.',
  },
];

const budgets = [
  { id: 'fast', label: 'Dưới 3 triệu', note: 'Ưu tiên hiện diện nhanh, ít trang.' },
  { id: 'growth', label: '3-8 triệu', note: 'Đủ tốt cho landing/website dịch vụ tạo lead.' },
  { id: 'custom', label: 'Trên 8 triệu', note: 'Có thể mở rộng nhiều trang hoặc chức năng riêng.' },
];

const timelines = [
  { id: 'soon', label: 'Trong 1 tuần' },
  { id: 'month', label: 'Trong tháng này' },
  { id: 'plan', label: 'Đang lên kế hoạch' },
];

const packageMeta: Record<string, { price: string; timeline: string; nextStep: string }> = {
  'Cơ bản': {
    price: '2.900.000đ',
    timeline: '3-5 ngày',
    nextStep: 'Chốt nội dung cốt lõi, CTA chính và một mẫu tham chiếu.',
  },
  'Tăng trưởng': {
    price: '5.900.000đ',
    timeline: '7-10 ngày',
    nextStep: 'Xác định offer, proof, bảng giá, form lead và tracking cần đo.',
  },
  'Theo yêu cầu': {
    price: 'Từ 12.000.000đ',
    timeline: 'Theo phạm vi',
    nextStep: 'Làm rõ luồng vận hành, dữ liệu, tích hợp và các trang cần quản lý.',
  },
};

export function NeedPicker() {
  const [goalId, setGoalId] = useState(goals[0].id);
  const [budgetId, setBudgetId] = useState(budgets[1].id);
  const [timelineId, setTimelineId] = useState(timelines[1].id);

  const recommendation = useMemo(() => {
    const goal = goals.find((item) => item.id === goalId) ?? goals[0];
    const budget = budgets.find((item) => item.id === budgetId) ?? budgets[1];
    const timeline = timelines.find((item) => item.id === timelineId) ?? timelines[1];

    let packageName = goal.packageName;

    if (budget.id === 'fast' && goal.id !== 'system') {
      packageName = 'Cơ bản';
    }

    if (budget.id === 'custom' || goal.id === 'system') {
      packageName = 'Theo yêu cầu';
    }

    return { ...goal, packageName, budget, timeline };
  }, [budgetId, goalId, timelineId]);

  return (
    <section className="need-picker" id="chon-nhu-cau">
      <div className="need-picker-copy">
        <p className="eyebrow">Chọn nhu cầu</p>
        <h2>Chọn mục tiêu để thấy gói, giá và mẫu gần nhất.</h2>
        <p>
          Phần này giúp khách tự định vị trước khi liên hệ: cần web để tạo lead, bán sản phẩm,
          xây hồ sơ tin cậy hay làm chức năng riêng.
        </p>
      </div>

      <div className="need-picker-panel">
        <fieldset>
          <legend>Mục tiêu chính</legend>
          <div>
            {goals.map((goal) => (
              <button className={goal.id === goalId ? 'active' : undefined} key={goal.id} type="button" onClick={() => setGoalId(goal.id)}>
                {goal.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Ngân sách dự kiến</legend>
          <div>
            {budgets.map((budget) => (
              <button className={budget.id === budgetId ? 'active' : undefined} key={budget.id} type="button" onClick={() => setBudgetId(budget.id)}>
                {budget.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Thời gian mong muốn</legend>
          <div>
            {timelines.map((timeline) => (
              <button className={timeline.id === timelineId ? 'active' : undefined} key={timeline.id} type="button" onClick={() => setTimelineId(timeline.id)}>
                {timeline.label}
              </button>
            ))}
          </div>
        </fieldset>

        <article className="need-result">
          <span>Gợi ý phù hợp</span>
          <h3>Gói {recommendation.packageName}</h3>
          <div className="need-result-meta">
            <b>{packageMeta[recommendation.packageName].price}</b>
            <b>{packageMeta[recommendation.packageName].timeline}</b>
          </div>
          <p>{recommendation.reason}</p>
          <small>
            {recommendation.budget.note} Thời gian: {recommendation.timeline.label.toLowerCase()}.
          </small>
          <small>{packageMeta[recommendation.packageName].nextStep}</small>
          <div>
            <Link href={recommendation.template}>Xem mẫu gần nhất</Link>
            <Link href={`/lien-he?goi=${encodeURIComponent(recommendation.packageName)}&muc-tieu=${goalId}`}>Nhận tư vấn gói này</Link>
          </div>
        </article>
      </div>
    </section>
  );
}
