# Flashcard Học Từ Vựng - Dùng JSON

## Cách chạy

Cách tốt nhất:
1. Mở thư mục dự án bằng VS Code.
2. Cài extension **Live Server**.
3. Chuột phải vào `index.html`.
4. Chọn **Open with Live Server**.

## File quan trọng

- `index.html`: giao diện chính
- `style.css`: giao diện
- `script.js`: xử lý flashcard
- `vocabulary.json`: nơi lưu nội dung từ vựng

## Cách thêm từ vựng cố định

Mở file `vocabulary.json` và thêm dữ liệu theo mẫu:

```json
{
  "word": "New word",
  "meaning": "Nghĩa tiếng Việt",
  "example": "Câu ví dụ tiếng Anh",
  "category": "Chủ đề"
}
```

## Chức năng

- Đọc từ vựng từ file JSON
- Lật flashcard
- Chuyển thẻ trước / sau
- Chọn thẻ ngẫu nhiên
- Thêm từ tạm thời trên giao diện
