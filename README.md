# FE-WebPanel

## Mô tả dự án
FE-WebPanel là một ứng dụng frontend được xây dựng bằng ReactJS, phục vụ như một bảng điều khiển web (web panel) cho hệ thống backend.

## Công nghệ sử dụng
- **Frontend Framework**: ReactJS 19.1.1
- **IDE**: Cursor Pro
- **Routing**: React Router DOM
- **Build Tool**: React Scripts
- **Deployment**: Cloudflare Pages

## Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js (phiên bản được khuyến nghị: LTS)
- npm hoặc yarn

### Cài đặt
1. Clone repository:
```bash
git clone <repository-url>
cd fe-webpanel
```

2. Cài đặt dependencies:
```bash
npm install
```

### Biến môi trường
Trước khi chạy dự án, bạn cần tạo file `.env` trong thư mục gốc với biến môi trường sau:

```env
REACT_APP_BACKEND_URL=<your-backend-api-url>
```

### Chạy dự án
- **Development mode**:
```bash
npm start
```

- **Production build**:
```bash
npm run build
```

## Scripts có sẵn
- `npm start` - Chạy ứng dụng ở chế độ development
- `npm run build` - Build ứng dụng cho production
- `npm test` - Chạy tests
- `npm run eject` - Eject từ Create React App (không thể hoàn tác)

## Deployment
Dự án được deploy trên Cloudflare Pages. Build command sử dụng:
```bash
npm run build
```

## Thông tin thêm
- **Version**: 0.1.0
- **Author**: abxST
- **License**: Private

## Hỗ trợ
Nếu gặp vấn đề, vui lòng tạo issue trong repository hoặc liên hệ với tác giả.
