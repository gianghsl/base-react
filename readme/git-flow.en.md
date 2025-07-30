# 🚀 Git Workflow - Team Guidelines

This branching strategy ensures:

- Clear and controlled development.
- Minimized merge conflicts.
- Support for multiple environments: Development, Staging, and Production.

---

## 🗂️ Branch Types

| Branch      | Purpose                                                                 |
| ----------- | ----------------------------------------------------------------------- |
| `main`      | Contains production-ready code. Always stable.                          |
| `staging`   | Pre-release code tested from `dev`.                                     |
| `dev`       | Integration branch for completed features. Not guaranteed to be stable. |
| `feature/*` | Individual branches for developing new features.                        |
| `hotfix/*`  | Urgent fixes for critical production bugs.                              |

---

## 🔁 Developer Workflow

1. **Create a feature branch from `dev`**

   ```bash
   git checkout dev
   git pull
   git checkout -b feature/feature-name
   ```

2. **Work on the `feature/*` branch**  
   → Commit frequently in small units.

3. **Push your branch**

   ```bash
   git push origin feature/feature-name
   ```

4. **Create a Pull Request to merge into `dev`**

5. **After review, Lead merges `dev` → `staging` for QA testing**

6. **Once stable, merge `staging` → `main` to release to production**

---

## ⚠️ Production Bug Fixes (Hotfix)

1. Create a branch from `main`:

   ```bash
   git checkout main
   git pull
   git checkout -b hotfix/bug-name
   ```

2. Fix the bug, push the branch, then merge into:
   - `main` (for immediate deployment)
   - `dev` (to keep codebase synced)
   - `staging` (if QA needs to retest)

---

## 🧠 Branch Naming Conventions

- `feature/login-page`
- `feature/payment-api`
- `hotfix/crash-homepage`
- `bugfix/input-validation`

---

## ✅ Notes

- **Always pull the latest code before creating a new branch.**
- **Never commit directly to `dev`, `staging`, or `main`.**
- **Use clear and concise commit messages.**
- **Reference related issue/ticket if applicable.**

---

Happy coding! 🚀
