# Kural Admin Dashboard

First repo for building the kural-admin dashboard.

---

## 📊 Project Overview

This is a React-based admin dashboard project with a collaborative workflow. The repository uses **Git**, **GitHub**, and **Pull Requests** to manage contributions efficiently.

### Tech Stack

- **JavaScript** (99.4%)
- **Other** (0.6%)

---

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [For Contributors (Fork & PR)](#for-contributors-fork--pr)
- [For Admins (Review & Merge)](#for-admins-review--merge)
- [Pull Request Template](#pull-request-template)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- Git configured

### Installation

```bash
npm install
npm run dev
```

---

## 👥 For Contributors (Fork & PR)

### Step 1: Fork the Repository

1. Visit the main repository  
   👉 [Kural Admin Repository](https://github.com/Dhavanesh24cs412/kural-admin)
2. Click **Fork** (top-right corner)
3. Your fork will be created at:  
   ```
   https://github.com/YOUR_USERNAME/kural-admin
   ```

---

### Step 2: Clone Your Fork Locally

```bash
git clone https://github.com/YOUR_USERNAME/kural-admin.git
cd kural-admin
```

---

### Step 3: Add Upstream Remote (Main Repository)

```bash
git remote add upstream https://github.com/Dhavanesh24cs412/kural-admin.git
git fetch upstream
```

Verify remotes:

```bash
git remote -v
```

---

### Step 4: Create a Feature Branch

> **Never work directly on `main`**

```bash
git checkout main
git pull upstream main
git checkout -b your-name-branch
```

**Branch Naming Conventions:**

- `feature/` – new features
- `fix/` – bug fixes
- `docs/` – documentation
- `chore/` – maintenance tasks

> **Tip:** Use your name as part of the branch name to avoid branch clutter. Example: `yourname-feature`

---

### Step 5: Make Your Changes

```bash
npm install
npm run dev
```

Make your changes, then stage and commit:

```bash
git add .
git commit -m "feat: add responsive navbar"
```

---

### Step 6: Push Changes and Create a Pull Request

```bash
git push origin your-name-branch
```

Then open a **Pull Request** on GitHub with a clear description of your changes.

---

## 🔍 For Admins (Review & Merge)

### Reviewing Pull Requests

1. Check out the PR branch:

```bash
git checkout main
git pull origin main
```

2. Review the changes carefully
3. Approve or request changes
4. Merge when ready:

```bash
git merge PR-BRANCH-NAME
git push origin main
```

---

## 📝 Pull Request Template

When creating a PR, include the following information in `.github/pull_request_template.md`:

```markdown
## Changes
- Brief description of changes

## Why
- Reason for changes

## Testing
- How to test the changes

## Screenshots
- Attach relevant screenshots if applicable
```

---

## 📌 Commit Message Guidelines

Follow the conventional commits format:

```text
feat: add login validation
fix: mobile navbar overlap
docs: update README
chore: update dependencies
```

**Format:** `<type>: <description>`

---

## 🆘 Troubleshooting

| Issue | Solution |
|------|----------|
| `npm install` fails | `rm -rf node_modules package-lock.json && npm install` |
| Merge conflict | `git pull upstream main` and resolve conflicts manually |
| Branch is behind main | `git pull upstream main` to sync with latest changes |
| Accidentally committed to main | Create a new branch and cherry-pick commits |

---

## 📧 Need Help?

If you encounter any issues, please:
1. Check the **Troubleshooting** section above
2. Review existing issues on GitHub
3. Create a new issue with a clear description

---

## 🎉 Happy Coding!

Thank you for contributing to Kural Admin Dashboard! 🚀