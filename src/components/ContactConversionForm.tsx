'use client';

import { FormEvent, useState } from 'react';
import { trackEvent } from '@/lib/tracking';

const recipient = 'khanhvan18052004@gmail.com';

export function ContactConversionForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') || '');
    const phone = String(formData.get('phone') || '');
    const service = String(formData.get('service') || '');
    const budget = String(formData.get('budget') || '');
    const timeline = String(formData.get('timeline') || '');
    const message = String(formData.get('message') || '');

    trackEvent({
      action: 'lead_form_submit',
      category: 'conversion',
      label: service,
      value: 1,
    });

    const subject = `YenTH Shop - ${name} cần tư vấn website`;
    const body = [
      `Họ tên: ${name}`,
      `Số điện thoại/Zalo: ${phone}`,
      `Nhu cầu: ${service}`,
      `Ngân sách dự kiến: ${budget}`,
      `Thời gian mong muốn: ${timeline}`,
      '',
      'Mô tả:',
      message,
    ].join('\n');

    setSubmitted(true);
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="contact-form conversion-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Họ tên
          <input name="name" placeholder="Tên của bạn" required />
        </label>
        <label>
          Số điện thoại / Zalo
          <input name="phone" placeholder="0375..." inputMode="tel" required />
        </label>
      </div>
      <label>
        Nhu cầu chính
        <select name="service" defaultValue="" required>
          <option value="" disabled>
            Chọn loại website
          </option>
          <option>Website bán hàng</option>
          <option>Landing page dịch vụ</option>
          <option>Website cá nhân / portfolio</option>
          <option>Website doanh nghiệp nhỏ</option>
          <option>Chưa rõ, cần được tư vấn</option>
        </select>
      </label>
      <div className="form-grid">
        <label>
          Ngân sách dự kiến
          <select name="budget" defaultValue="" required>
            <option value="" disabled>
              Chọn khoảng ngân sách
            </option>
            <option>Dưới 3 triệu</option>
            <option>3 - 6 triệu</option>
            <option>6 - 12 triệu</option>
            <option>Trên 12 triệu</option>
          </select>
        </label>
        <label>
          Thời gian mong muốn
          <select name="timeline" defaultValue="" required>
            <option value="" disabled>
              Chọn thời gian
            </option>
            <option>Càng sớm càng tốt</option>
            <option>Trong 1 tuần</option>
            <option>Trong 2 - 4 tuần</option>
            <option>Chưa gấp</option>
          </select>
        </label>
      </div>
      <label>
        Mô tả ngắn
        <textarea
          name="message"
          placeholder="Ví dụ: Tôi cần website giới thiệu dịch vụ spa tại Bình Thạnh, có nút Zalo và form đặt lịch..."
          rows={5}
          required
        />
      </label>
      <button className="btn btn-primary" type="submit">
        Gửi nhu cầu và nhận hướng triển khai
      </button>
      <p className="form-note">
        {submitted
          ? 'Cửa sổ email đã được mở. Bạn chỉ cần bấm gửi để hoàn tất.'
          : 'Form này ghi nhận conversion và mở email đã điền sẵn nội dung để bạn gửi nhanh.'}
      </p>
    </form>
  );
}
