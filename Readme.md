# Dự án: Web App Làm Bài Trắc Nghiệm (QUIZ)

## 🛠 Công nghệ sử dụng
- HTML, CSS, SCSS
- JavaScript (ES6+)
- ReactJS (Hooks, Component-based)
- JSON Server (giả lập API backend)
- Ant Design (loading, UI)
- SweetAlert2 (popup xác nhận)
- sessionStorage (lưu phiên người dùng)

---

## 🚀 Tính năng chính

- Đăng ký / Đăng nhập người dùng
- Chọn chủ đề trắc nghiệm
- Làm bài, chọn đáp án
- Kiểm tra và nộp bài
- Tính điểm, hiển thị kết quả
- Xem lại lịch sử làm bài
- Lưu kết quả và thông tin người dùng

---

## ✨ Điểm nổi bật

- **Form validation**: kiểm tra dữ liệu đầu vào (email, mật khẩu...)
- **Cảnh báo lỗi rõ ràng**: giúp người dùng dễ thao tác hơn
- **Kiểm tra số câu đã trả lời**: ngăn người dùng nộp bài thiếu
- **Xác nhận trước khi nộp** bằng popup của SweetAlert2
- **Ngăn spam nộp bài, đăng ký đăng nhập** bằng nút có loading (`Ant Design`)
- **Giao diện đơn giản, dễ dùng** – thân thiện với người mới

---

## 🧠 Quy trình người dùng

1. Người dùng đăng ký hoặc đăng nhập
2. Chọn một chủ đề để bắt đầu làm bài
3. Trả lời các câu hỏi trắc nghiệm (MCQ)
4. Nhấn **"Nộp bài"** → hiển thị điểm & kết quả
5. Lịch sử làm bài được lưu trong `sessionStorage` (theo người dùng)

