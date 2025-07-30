# 🚀 Git Workflow - Team Guidelines

Quy trình quản lý nhánh cho dự án này nhằm đảm bảo:

- Code rõ ràng, dễ kiểm soát.
- Hạn chế xung đột khi merge.
- Hỗ trợ tốt cho nhiều môi trường: Development, Staging, Production.

---

## 🗂️ Các loại nhánh

| Branch      | Vai trò                                                     |
| ----------- | ----------------------------------------------------------- |
| `main`      | Chứa code production. Luôn ổn định.                         |
| `staging`   | Code chuẩn bị release, đã test ở môi trường dev.            |
| `dev`       | Nơi tổng hợp các feature đã làm xong, chưa cần quá ổn định. |
| `feature/*` | Nhánh của từng dev để phát triển tính năng.                 |
| `hotfix/*`  | Dùng để sửa lỗi khẩn cấp trên production.                   |

---

## 🔁 Quy trình làm việc của Dev

1. **Tạo nhánh tính năng từ `dev`**

   ```bash
   git checkout dev
   git pull
   git checkout -b feature/tên-tính-năng
   ```

2. **Làm việc trên nhánh `feature/*`**  
   → Commit code thường xuyên theo từng phần nhỏ.

3. **Push lên remote**

   ```bash
   git push origin feature/tên-tính-năng
   ```

4. **Tạo Pull Request về `dev`**

5. **Sau khi review xong, Lead merge `dev` → `staging` để QA test**

6. **Khi ổn định, merge `staging` → `main` để release lên production**

---

## ⚠️ Fix bug production (Hotfix)

1. Tạo nhánh từ `main`:

   ```bash
   git checkout main
   git pull
   git checkout -b hotfix/ten-loi
   ```

2. Fix lỗi, push code và merge vào:
   - `main` (để deploy ngay)
   - `dev` (để giữ code đồng bộ)
   - `staging` (nếu cần QA test lại)

---

## 🧠 Quy ước đặt tên nhánh

- `feature/login-page`
- `feature/payment-api`
- `hotfix/crash-homepage`
- `bugfix/input-validation`

---

## ✅ Lưu ý

- **Luôn pull code mới nhất trước khi tạo nhánh mới.**
- **Không commit trực tiếp vào `dev`, `staging`, `main`.**
- **Viết commit message rõ ràng.**
- **Gắn issue/ticket nếu có (nếu dùng GitHub/GitLab/Jira).**

---

Happy coding! 🚀
