# CRUD Express + Sequelize + MySQL

Project mẫu triển khai CRUD sử dụng Node.js, Express, Sequelize và MySQL.

## Mô tả
- Ứng dụng minh họa cách tạo, đọc, cập nhật, xóa (CRUD) người dùng bằng Express và Sequelize.
- Cấu trúc dự án rõ ràng để bạn dễ hiểu và mở rộng.

## Yêu cầu
- Node.js >= 14
- MySQL server

## Cài đặt
1. Clone repository hoặc tải source về máy.
2. Cài dependencies:

```bash
npm install
```

3. Cấu hình kết nối cơ sở dữ liệu: chỉnh sửa src/config/config.json theo thông tin MySQL của bạn.

4. Tạo database và chạy migrations (nếu sử dụng Sequelize CLI). Nếu không có migration tự động, tạo database thủ công.

## Cấu trúc chính
- src/ - mã nguồn chính
  - server.js - entry ứng dụng
  - config/ - cấu hình (ví dụ config.json, configdb.js)
  - controller/ - controller xử lý request
  - models/ - định nghĩa model Sequelize
  - route/ - định nghĩa route
  - services/ - logic CRUD chung
  - views/ - template EJS

## Chạy ứng dụng

```bash
# khởi động
node src/server.js

# hoặc dùng script nếu có trong package.json
npm start
```

Sau khi chạy, mở trình duyệt tới http://localhost:3000 (hoặc port cấu hình trong server.js).

## Thêm thông tin
- Routes chính nằm trong src/route/web.js.
- Model user: src/models/user.js.
- Service CRUD: src/services/CRUDService.js.

## Góp ý & Phát triển
- Muốn thêm API JSON RESTful, có thể tạo route API riêng và trả JSON từ controller.
- Thêm kiểm thử tự động (jest/mocha) để bảo đảm tính ổn định.

## License
- Mở (do tác giả tự chọn). Thêm file LICENSE nếu muốn cụ thể hóa.

---
Nếu bạn muốn, tôi có thể: cấu hình package.json scripts, thêm hướng dẫn migration, hoặc tạo file LICENSE.
