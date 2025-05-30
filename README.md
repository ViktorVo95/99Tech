# 99Tech – Playwright Automation Project

🎯 Dự án này sử dụng [Playwright](https://playwright.dev/) để tự động hóa kiểm thử web cho hệ thống [99Tech](https://github.com/ViktorVo95/99Tech).

## ✅ Yêu cầu hệ thống

- Node.js >= 16.x
- npm hoặc yarn
- Git (nếu clone dự án)

## 🚀 Cài đặt

1. Clone project:
   ```bash
   git clone https://github.com/ViktorVo95/99Tech.git
   cd 99Tech
   ```

2. Cài đặt dependency:
   ```bash
   npm install
   ```

3. Cài đặt trình duyệt cho Playwright:
   ```bash
   npx playwright install
   ```

---

## 🧪 Chạy test

### Chạy toàn bộ test:
```bash
npx playwright test
```

### Chạy test với giao diện (UI mode):
```bash
npx playwright test --ui
```

### Chạy 1 file cụ thể:
```bash
npx playwright test tests/login.test.ts
```

---

## 🐞 Debug test

Chạy 1 test ở chế độ debug (thấy browser):
```bash
npx playwright test tests/login.test.ts --debug
```

Hoặc sửa trong `playwright.config.ts` để `headless: false` khi cần debug nhiều lần.

---

## 📁 Cấu trúc thư mục

```text
.
├── tests/                  # Thư mục chứa các file test (*.test.ts)
├── pages/                  # Page Object Models (POM)
├── global-setup.ts         # Thiết lập dữ liệu ban đầu (login, lưu session)
├── playwright.config.ts    # File cấu hình chính
└── README.md
```

---

## 🧠 Ghi chú

- File `global-setup.ts` thực hiện đăng nhập và lưu `storageState.json` để tái sử dụng session.
- Bạn có thể sửa credentials hoặc URL login trực tiếp trong file đó.

---

## 📦 Các lệnh bổ sung

### Mở Codegen (ghi lại thao tác thủ công):
```bash
npx playwright codegen https://your-site.com
```

### Mở báo cáo test (sau khi test xong):
```bash
npx playwright show-report
```

---

## ✨ Tài liệu

- [Playwright Docs](https://playwright.dev/)
- [Playwright VSCode Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

---

## 📮 Liên hệ

- Maintainer: [Viktor Vo](vothanh4295@gmail.com)
