# Dự án tạo mã QR thanh toán MB Bank

Ứng dụng web mini dùng HTML, CSS, JavaScript để tạo mã QR chuyển khoản MB Bank theo chuẩn VietQR Quick Link.

## Chức năng

- Nhập số tài khoản MB Bank.
- Nhập tên chủ tài khoản.
- Nhập số tiền VND.
- Nhập nội dung chuyển khoản.
- Chọn mẫu QR: `compact2`, `compact`, `qr_only`, `print`.
- Hiển thị mã QR thanh toán.
- Copy link QR.
- Mở ảnh QR trong tab mới.

## Cách chạy

1. Giải nén file ZIP.
2. Mở file `index.html` bằng trình duyệt.
3. Nhập thông tin thanh toán.
4. Bấm **Tạo mã QR**.

## Thông tin kỹ thuật

- Ngân hàng: MB Bank
- BIN MB Bank: `970422`
- Link VietQR sử dụng:

```txt
https://img.vietqr.io/image/970422-<SO_TAI_KHOAN>-<TEMPLATE>.png?amount=<SO_TIEN>&addInfo=<NOI_DUNG>&accountName=<TEN_CHU_TK>
```

## Lưu ý

- Đây là QR chuyển khoản thủ công, không tự xác nhận giao dịch thành công.
- Nội dung chuyển khoản nên viết không dấu, không ký tự đặc biệt.
- Khi test, hãy quét QR bằng app ngân hàng và kiểm tra kỹ thông tin trước khi chuyển tiền.
