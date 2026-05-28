'use client';

import { useMemo, useState } from 'react';

type Conversation = {
  id: string;
  name: string;
  label: string;
  online: boolean;
  messages: string[];
};

const initialConversations: Conversation[] = [
  {
    id: 'khach-hang',
    name: 'Khách hàng mới',
    label: 'Cần tư vấn gói website bán hàng',
    online: true,
    messages: ['Chào shop, mình muốn hỏi mẫu web bán hàng.', 'Bên bạn có làm form đặt hàng không?'],
  },
  {
    id: 'nhom-sale',
    name: 'Nhóm sale nội bộ',
    label: '3 thành viên đang hoạt động',
    online: true,
    messages: ['Hôm nay có 4 lead mới từ website.', 'Nhớ gọi lại khách lúc 15h nhé.'],
  },
  {
    id: 'doi-tac',
    name: 'Đối tác giao hàng',
    label: 'Cập nhật đơn nội thành',
    online: false,
    messages: ['Đơn quận 1 đã giao xong.', 'Mình gửi lại biên nhận trong nhóm.'],
  },
  {
    id: 'khach-vip',
    name: 'Khách VIP',
    label: 'Đang xem báo giá',
    online: true,
    messages: ['Mình cần web có đăng nhập thành viên.', 'Bạn gửi thêm demo giúp mình.'],
  },
];

const quickReplies = ['Gửi báo giá', 'Gửi demo', 'Hẹn gọi lại', 'Tạo đơn'];

export function SocialZaloDemo() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(initialConversations[0].id);
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState('Tin nhắn');

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeId) ?? conversations[0],
    [activeId, conversations],
  );

  function sendMessage(text = message) {
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === activeConversation.id
          ? { ...conversation, messages: [...conversation.messages, trimmed] }
          : conversation,
      ),
    );
    setMessage('');
  }

  return (
    <main className="zl-demo">
      <aside className="zl-rail" aria-label="Thanh công cụ">
        <strong>Z</strong>
        {['Chat', 'Danh bạ', 'Nhóm', 'Cloud', 'Cài đặt'].map((item) => (
          <button className={tab === item || (tab === 'Tin nhắn' && item === 'Chat') ? 'active' : undefined} key={item} type="button" onClick={() => setTab(item === 'Chat' ? 'Tin nhắn' : item)}>
            {item.slice(0, 1)}
          </button>
        ))}
      </aside>

      <section className="zl-list" aria-label="Danh sách hội thoại">
        <header>
          <h1>{tab}</h1>
          <input placeholder="Tìm bạn bè, nhóm, tin nhắn" />
        </header>
        <div className="zl-tabs">
          {['Tất cả', 'Chưa đọc', 'Nhóm', 'Khách hàng'].map((item) => (
            <button key={item} type="button">
              {item}
            </button>
          ))}
        </div>
        <div className="zl-conversations">
          {conversations.map((conversation) => (
            <button
              className={activeConversation.id === conversation.id ? 'active' : undefined}
              key={conversation.id}
              type="button"
              onClick={() => setActiveId(conversation.id)}
            >
              <span>{conversation.name.slice(0, 1)}</span>
              <div>
                <strong>{conversation.name}</strong>
                <small>{conversation.label}</small>
              </div>
              {conversation.online ? <i aria-label="Đang online" /> : null}
            </button>
          ))}
        </div>
      </section>

      <section className="zl-chat" aria-label="Khung chat">
        <header>
          <div>
            <strong>{activeConversation.name}</strong>
            <span>{activeConversation.online ? 'Đang hoạt động' : 'Hoạt động gần đây'}</span>
          </div>
          <nav aria-label="Thao tác hội thoại">
            <button type="button">Gọi</button>
            <button type="button">Video</button>
            <button type="button">Thêm</button>
          </nav>
        </header>

        <div className="zl-messages">
          {activeConversation.messages.map((item, index) => (
            <p className={index % 2 === 0 ? 'incoming' : 'outgoing'} key={`${activeConversation.id}-${index}`}>
              {item}
            </p>
          ))}
        </div>

        <div className="zl-quick">
          {quickReplies.map((reply) => (
            <button key={reply} type="button" onClick={() => sendMessage(reply)}>
              {reply}
            </button>
          ))}
        </div>

        <footer>
          <button type="button">+</button>
          <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Nhập tin nhắn" />
          <button type="button" onClick={() => sendMessage()}>
            Gửi
          </button>
        </footer>
      </section>

      <aside className="zl-info" aria-label="Thông tin hội thoại">
        <div className="zl-card">
          <span>{activeConversation.name.slice(0, 1)}</span>
          <h2>{activeConversation.name}</h2>
          <p>{activeConversation.label}</p>
          <div>
            <button type="button">Ghim</button>
            <button type="button">Tạo việc</button>
          </div>
        </div>
        <section>
          <h3>Tệp & ảnh</h3>
          <div className="zl-files">
            <span>Báo giá.pdf</span>
            <span>Demo.png</span>
            <span>Brief.docx</span>
          </div>
        </section>
        <section>
          <h3>Ghi chú CRM</h3>
          <p>Lead đến từ danh mục web mạng xã hội. Ưu tiên gửi demo có chat, nhóm và thông báo.</p>
        </section>
      </aside>
    </main>
  );
}
