# React App Collaboration Guide

This guide explains how to **fork**, **contribute**, **review**, and **merge** changes to this React project using **GitHub Pull Requests (PRs)**.  
Follow these steps exactly to ensure smooth team collaboration and avoid conflicts.

---

## Table of Contents

- [For Contributors (Fork & PR)](#for-contributors-fork--pr)
- [For Admins (Review & Merge)](#for-admins-review--merge)
- [Pull Request Template](#pull-request-template)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Troubleshooting](#troubleshooting)

---

## For Contributors (Fork & PR)

### Step 1: Fork the Repository

1. Visit the main repository  
   👉 https://github.com/OWNER/react-app
2. Click **Fork** (top-right corner)
3. Your fork will be created at:  
   `https://github.com/YOUR_USERNAME/react-app`

---

### Step 2: Clone Your Fork Locally

```bash
git clone https://github.com/YOUR_USERNAME/react-app.git
cd react-app
```

---

### Step 3: Add Upstream Remote (Main Repository)

```bash
git remote add upstream https://github.com/OWNER/react-app.git
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
git checkout -b feature/your-feature-name
```

**Branch naming conventions:**
- `feature/` – new features
- `fix/` – bug fixes
- `docs/` – documentation
- `chore/` – maintenance tasks

---

### Step 5: Make Your Changes

```bash
npm install
npm run dev
```

Commit changes:

```bash
git add .
git commit -m "feat: add responsive navbar"
```

---

### Step 6: Push Changes and Create a Pull Request

```bash
git push origin feature/your-feature-name
```

---

## For Admins (Review & Merge)

```bash
git checkout main
git pull origin main
```

---

## Pull Request Template

Create `.github/pull_request_template.md`

```md
## Changes
## Why
## Testing
## Screenshots
```

---

## Commit Message Guidelines

```text
feat: add login validation
fix: mobile navbar overlap
docs: update README
```

---

## Troubleshooting

| Issue | Solution |
|------|----------|
| npm install fails | rm -rf node_modules package-lock.json && npm install |
| merge conflict | git pull upstream main |

---

Happy coding 🚀
