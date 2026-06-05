# Web Scan Document

Ứng dụng web nhỏ hỗ trợ scan tài liệu bằng camera hoặc chọn ảnh.

## Cách dùng
1. Mở `index.html` bằng trình duyệt.
2. Bấm **Mở camera** hoặc **Chọn ảnh**.
3. Chụp/chọn tài liệu.
4. Chỉnh sáng, tương phản, đen trắng.
5. Bấm **Thêm trang scan**.
6. Bấm **Xuất PDF**.

## Lưu ý
- Nếu mở trực tiếp file mà camera không hoạt động, hãy chạy bằng server local:

```bash
python -m http.server 8000
```

Sau đó mở:

```text
http://localhost:8000
```
