# Thierlavier FSMS - Module Nguyễn Minh Đức (Cart & Combo)

Dự án này là phân hệ độc lập của **Nguyễn Minh Đức** trong đồ án SWD392 (FSMS), thực thi hoàn chỉnh **5 Use Cases** dạng CRUD thuộc nhóm tính năng **Cart & Promotions**:

## 5 Use Cases Được Triển Khai:
1. **UC-01: Add Item to Cart (Thêm sản phẩm vào giỏ hàng)**:
   - Chọn biến thể (màu sắc, kích thước) và số lượng.
   - Kiểm tra tồn kho thời gian thực (BR-27, BR-29).
   - Giới hạn tối đa 10 đơn vị cho cùng một biến thể trong giỏ (BR-09).
2. **UC-02: Manage Shopping Cart (Quản lý giỏ hàng)**:
   - Xem chi tiết giỏ hàng, hình ảnh, phân loại, đơn giá.
   - Tăng/giảm số lượng với chặn giới hạn tối đa 10 (BR-09) và kiểm tra tồn kho (BR-27).
   - Xóa từng sản phẩm hoặc làm trống toàn bộ giỏ hàng.
   - Tự động tính toán tổng tiền tạm tính, giảm trừ ưu đãi Combo và tổng thanh toán (BR-04, BR-05).
3. **UC-03: View Combo List & Details (Xem danh sách & chi tiết gói Combo)**:
   - Danh sách các combo khuyến mãi đang kích hoạt và còn hạn sử dụng (BR-35).
   - Hiển thị danh sách sản phẩm thành phần trong gói, giá gốc, giá ưu đãi combo và số tiền tiết kiệm được.
4. **UC-04: Add Combo to Cart (Thêm trọn bộ Combo vào giỏ hàng)**:
   - Mở modal cho phép chọn phân loại màu sắc và size cho từng sản phẩm trong gói.
   - Thêm đồng loạt các sản phẩm vào giỏ hàng gắn kèm `comboGroupId` và áp dụng mức giảm giá tự động (BR-04, BR-05, BR-10).
5. **UC-06: Manage Combos (Quản trị gói Combo - Admin/Staff CRUD)**:
   - Tạo mới Combo: Tên, mã code duy nhất, loại giảm giá (%, tiền mặt, giá trọn gói), thời gian hiệu lực (BR-35: EndDate > StartDate).
   - Ràng buộc chống trùng lặp Combo (BR-10 Anti-Combo Duplication): 1 sản phẩm không thể nằm trong nhiều combo cùng lúc đang kích hoạt.
   - Bật/Tắt trạng thái kích hoạt (Active/Inactive) của Combo.
   - Xóa gói Combo.

## Cấu hình Môi trường & Database:
- Database: PostgreSQL với database riêng biệt `fsms_duc`.
- Connection string trong `.env`:
  `DATABASE_URL="postgresql://postgres:minhduc25072005@127.0.0.1:5432/fsms_duc?schema=public"`
- Backend Port: `3001` (tránh xung đột với các dịch vụ khác)
- Frontend Port: `5174`

## Hướng dẫn Chạy & Đồng bộ Dữ liệu khi chuyển sang máy khác:

### 1. Đồng bộ CSDL & Nạp dữ liệu Test mẫu:
Sau khi clone/copy sang máy mới và cấu hình `DATABASE_URL` trong file `.env`:
```bash
cd backend
npm install
npx prisma generate
npx prisma db push

# Cách 1: Nạp dữ liệu bằng Prisma Seeder tự động (Khuyên dùng)
npx prisma db seed
# hoặc: npm run seed

# Cách 2: Nạp dữ liệu bằng file SQL thuần (nếu dùng pgAdmin / DBeaver / psql)
# File đã được xuất sẵn tại: backend/prisma/seed.sql
psql -U postgres -d fsms_duc -f prisma/seed.sql
```

### 2. Khởi động Backend:
```bash
cd backend
npm run start:dev
```
API hoạt động tại: `http://localhost:3001/api`

### 3. Khởi động Frontend:
```bash
cd frontend
npm install
npm run dev
```
Giao diện hoạt động tại: `http://localhost:5174`

