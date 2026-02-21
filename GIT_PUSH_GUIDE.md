# 🚀 Push KodBank to GitHub - Step by Step

## **Step 1: Create Repository on GitHub**

1. Go to https://github.com/new
2. Sign in with your GitHub account (create one if needed)
3. Fill in repository details:
   ```
   Repository name: KodBank
   Description: Digital Banking Application with JWT Authentication
   Visibility: Public (or Private)
   ```
4. **Do NOT** check "Initialize this repository with a README"
5. Click **Create Repository**

You'll see:
```
Quick setup — if you've done this kind of thing before
Set up in Desktop   HTTPS   SSH   

https://github.com/YOUR_USERNAME/KodBank.git
```

**Copy this URL** - you'll need it in Step 4.

---

## **Step 2: Add Files to Git (Local)**

```powershell
cd C:\Users\admin\Desktop\KodBank
git add .
```

This stages all files except those in `.gitignore`

**Verify what's being added:**
```powershell
git status
```

You should see files listed in green (ready to commit)

---

## **Step 3: Create Initial Commit**

```powershell
git commit -m "Initial commit: Kodbank digital banking application with JWT auth and React frontend"
```

**Expected output:**
```
[main (root-commit) abc1234] Initial commit...
 XX files changed, XXXX insertions(+)
 create mode 100644 backend/server.js
 create mode 100644 frontend/src/App.js
 ...
```

---

## **Step 4: Add Remote Repository (Connect to GitHub)**

Replace `YOUR_USERNAME` with your actual GitHub username:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/KodBank.git
```

**Verify it worked:**
```powershell
git remote -v
```

You should see:
```
origin  https://github.com/YOUR_USERNAME/KodBank.git (fetch)
origin  https://github.com/YOUR_USERNAME/KodBank.git (push)
```

---

## **Step 5: Rename Branch to Main (if needed)**

```powershell
git branch -M main
```

---

## **Step 6: Push to GitHub**

```powershell
git push -u origin main
```

**You'll be prompted for authentication:**
- Enter your GitHub username
- Enter your GitHub personal access token (or password)

**For Personal Access Token (Recommended):**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token"
3. Select scopes: `repo` (full control)
4. Copy the token
5. Use it as password when prompted

**Expected output:**
```
Enumerating objects: 50, done.
Counting objects: 100% (50/50), done.
Delta compression using up to 8 threads
Compressing objects: 100% (45/45), done.
Writing objects: 100% (50/50), 25.50 KiB | 1.25 MiB/s, done.
Total 50 (delta 5), reused 0 (delta 0), pack-reused 0

To https://github.com/YOUR_USERNAME/KodBank.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

✅ **Success! Your code is now on GitHub!**

---

## **All Commands in Sequence**

```powershell
# Navigate to project
cd C:\Users\admin\Desktop\KodBank

# Stage all files
git add .

# Commit changes
git commit -m "Initial commit: Kodbank digital banking application"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/KodBank.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## **Step 7: Verify on GitHub**

1. Go to https://github.com/YOUR_USERNAME/KodBank
2. You should see all your files:
   ```
   ✅ backend/
   ✅ frontend/
   ✅ README.md
   ✅ .gitignore
   ✅ DEPLOYMENT.md
   ✅ HOW_TO_RUN.md
   ```

---

## **Future Commits (After Making Changes)**

Once your repo is set up, for future changes:

```powershell
# Stage changes
git add .

# Commit with message
git commit -m "Description of changes"

# Push to GitHub
git push
```

---

## **What Gets Pushed to GitHub**

✅ **Included:**
- backend/ folder (all code)
- frontend/ folder (all React code)
- README.md, DEPLOYMENT.md, HOW_TO_RUN.md
- .gitignore file
- Configuration files

❌ **NOT Included:**
- node_modules/ (in .gitignore)
- .env (in .gitignore - keep secrets safe!)
- Build files

---

## **Troubleshooting**

### ❌ **Error: "origin already exists"**
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/KodBank.git
```

### ❌ **Error: "Permission denied"**
```powershell
# Use personal access token instead of password
# Generate at: https://github.com/settings/tokens
```

### ❌ **Error: "Please tell me who you are"**
```powershell
git config --global user.email "your.email@example.com"
git config --global user.name "Your Name"
```

---

## **View Repository**

After pushing, your repo will be at:
```
https://github.com/YOUR_USERNAME/KodBank
```

Share this link with others to showcase your project! 🎉

---

## **Summary**

| Step | Command |
|------|---------|
| 1 | Create repo on GitHub at github.com/new |
| 2 | `git add .` |
| 3 | `git commit -m "Initial commit..."` |
| 4 | `git remote add origin https://github.com/YOU/KodBank.git` |
| 5 | `git branch -M main` |
| 6 | `git push -u origin main` |
| 7 | View at github.com/YOU/KodBank ✅ |

**Ready to push?** 🚀
