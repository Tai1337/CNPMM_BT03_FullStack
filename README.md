#Nguyễn Phước Tài MSSV: 23110306
# FullStack NodeJS & ReactJS - MongoDB Auth App

Dự án này là một ứng dụng Web FullStack được xây dựng bằng **Node.js, Express, MongoDB** ở phía Backend và **ReactJS (Vite), Ant Design** ở phía Frontend. Dự án triển khai tính năng xác thực người dùng bao gồm: Đăng ký, Đăng nhập (JWT), Quên mật khẩu và Đặt lại mật khẩu qua Email.

## Công nghệ sử dụng
- **Backend**: Node.js, Express.js, Mongoose (MongoDB), JSON Web Token (JWT), bcryptjs, nodemailer.
- **Frontend**: ReactJS (Vite), React Router DOM, Axios, Ant Design.
- **Database**: MongoDB.

## Tính năng chính
- **Đăng ký (Register)**: Cho phép người dùng mới tạo tài khoản.
- **Đăng nhập (Login)**: Xác thực người dùng, trả về JWT Token.
- **Quên mật khẩu (Forgot Password)**: Gửi link chứa Token giới hạn thời gian vào email người dùng.
- **Đặt lại mật khẩu (Reset Password)**: Kiểm tra Token hợp lệ và đặt mật khẩu mới.
- **Bảo vệ Route (Private Route)**: Chỉ cho phép truy cập Dashboard (Home) khi đã đăng nhập có Token hợp lệ.

---

## 🛠 Hướng dẫn Cài đặt & Chạy ứng dụng

### Yêu cầu hệ thống
- Đã cài đặt **Node.js** (>= 16).
- Đã cài đặt và đang chạy **MongoDB** service (hoặc có chuỗi kết nối MongoDB Atlas).

### 1. Cài đặt & Cấu hình Backend

1. Mở Terminal tại thư mục gốc của dự án.
2. Cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   ```
3. Tạo và chỉnh sửa file `.env` ở thư mục gốc với nội dung sau (nếu chưa có):
   ```env
   PORT=8080
   MONGODB_URI=mongodb://127.0.0.1:27017/fullstack_db
   JWT_SECRET=my_super_secret_jwt_key
   JWT_EXPIRES_IN=1d
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```
4. Chạy Backend Server:
   ```bash
   npm start
   ```
   > 🚀 Server sẽ chạy tại: `http://localhost:8080`

---

### 2. Cài đặt & Chạy Frontend

1. Mở một Terminal mới, di chuyển vào thư mục `ReactJS01`:
   ```bash
   cd ReactJS01
   ```
2. Cài đặt các thư viện Frontend:
   ```bash
   npm install
   ```
3. Chạy Frontend Server:
   ```bash
   npm run dev
   ```
   > 🚀 Frontend sẽ chạy tại: `http://localhost:5173`

---

## Cấu trúc thư mục

```
CNPMM_BT03_FullStack/
├── .env                       # Cấu hình biến môi trường
├── package.json               # Package Backend
├── src/                       # Mã nguồn Backend
│   ├── config/
│   │   └── database.js        # File cấu hình kết nối MongoDB
│   ├── controllers/           # Xử lý Logic Request Backend
│   ├── middleware/            # Check JWT Token Auth
│   ├── models/                # Schema User (Mongoose)
│   ├── routes/                # API Endpoints
│   ├── services/              # Xử lý Logic thao tác DB, gửi Mail
│   └── server.js              # Entry file backend
├── FullStack_Auth_API.postman_collection.json  # Postman Collection để test API
└── ReactJS01/                 # Mã nguồn Frontend (React Vite)
    ├── package.json
    ├── src/
    │   ├── components/        # Chứa Layout, Context
    │   ├── pages/             # Các trang (Login, Register, Home...)
    │   └── util/              # Cấu hình Axios
```

## API Testing với Postman
Bạn có thể import file `FullStack_Auth_API.postman_collection.json` vào Postman để thử nghiệm toàn bộ các API. Collection này đã cấu hình sẵn việc tự động bắt Token sau khi đăng nhập thành công.

## Tác giả
- Nguyễn Phước Tài
