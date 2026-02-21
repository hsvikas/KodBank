# Kodbank Application - Complete Deployment Guide

## Prerequisites
- Node.js v14+ installed
- npm installed (comes with Node.js)
- Internet connection for database

---

## Step 1: Verify Installation
```powershell
node --version
npm --version
```
Both should show version numbers.

---

## Step 2: Install Backend Dependencies

Open PowerShell and run:

```powershell
cd C:\Users\admin\Desktop\KodBank\backend
npm install
```

Wait for all dependencies to install. You should see:
```
added XX packages in X.XXs
```

---

## Step 3: Verify Backend Files

Check that these files exist in the backend folder:
- ✅ `server.js`
- ✅ `db.js`
- ✅ `.env`
- ✅ `package.json`
- ✅ `routes/` folder (with auth.js and user.js)
- ✅ `middleware/` folder (with auth.js)
- ✅ `node_modules/` folder

---

## Step 4: Start Backend Server

In PowerShell, run:

```powershell
cd C:\Users\admin\Desktop\KodBank\backend
node server.js
```

**Expected Output:**
```
📦 Loading routes...
✅ Routes loaded successfully
🔧 Setting up middleware...
✅ Middleware configured
📍 Registering routes...

🚀 Kodbank Backend Server running on http://localhost:5000

📝 API Endpoints:
   POST   /api/auth/register
   POST   /api/auth/login
   POST   /api/auth/logout
   GET    /api/user/balance (protected)
   GET    /api/user/profile (protected)
```

**If you see errors:**

**Error: EADDRINUSE - Address already in use :::5000**
```powershell
# Kill all node processes
taskkill /IM node.exe /F
# Wait 2 seconds
Start-Sleep -Seconds 2
# Try again
node server.js
```

**Error: Cannot find module**
```powershell
# Reinstall dependencies
rm -r node_modules
npm install
node server.js
```

---

## Step 5: Verify Backend is Working

**Do NOT close the backend terminal.** Open a **NEW PowerShell terminal** and run:

```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/health"
```

**Expected Response:**
```
StatusCode        : 200
StatusDescription : OK
Content           : {"success":true,"message":"Server is running"}
```

If you see this ✅ **Backend is working!**

---

## Step 6: Install Frontend Dependencies

In a **NEW PowerShell terminal**, run:

```powershell
cd C:\Users\admin\Desktop\KodBank\frontend
npm install
```

Wait for all dependencies to install.

---

## Step 7: Start Frontend Server

In the same PowerShell terminal, run:

```powershell
npm start
```

**Wait for 1-2 minutes.** You should see:

```
Compiled successfully!

You can now view kodbank-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.xxx.xxx.xxx:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

**Browser will automatically open** to http://localhost:3000

---

## Step 8: Test the Application

### Step 8A: Register a User

1. You should see the **Registration Page** with:
   - Black background with yellow accents
   - Money and credit card emojis
   - Registration form

2. Fill in the form:
   ```
   Username: testuser2025
   Email: test2025@kodbank.com
   Password: Test@1234
   Phone: 9876543210
   ```

3. Click **Register** button

4. You should see success message:
   ```
   Registration successful! Please login.
   ```

### Step 8B: Login

1. You'll be redirected to **Login Page**

2. Enter credentials:
   ```
   Username: testuser2025
   Password: Test@1234
   ```

3. Click **Login** button

4. You should see success message and be redirected

### Step 8C: Check Balance

1. You'll see the **Dashboard** with:
   - Yellow header with "Welcome to Kodbank"
   - Your username
   - "Check Balance" button

2. Click **Check Balance**

3. You should see:
   ```
   Your Balance Is:
   ₹100,000.00
   ```
   With **confetti animation** 🎊

---

## Troubleshooting

### Frontend Shows "Network Error"

**Solution:**
1. Make sure backend is running (check terminal)
2. Hard refresh browser: `Ctrl+Shift+R`
3. Check browser console (F12 → Console)
4. Look for error messages

### Backend won't start

**Solution:**
```powershell
# Kill all node processes
taskkill /IM node.exe /F

# Go to backend folder
cd C:\Users\admin\Desktop\KodBank\backend

# Reinstall dependencies
rm -r node_modules
npm install

# Start again
node server.js
```

### Port 5000 already in use

**Solution:**
```powershell
# Find and kill process on port 5000
$process = Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess
Stop-Process -Id $process -Force
```

### Can't connect to database

**Solution:**
- Check internet connection
- Verify Aiven MySQL credentials in `.env` file
- Ensure firewall allows port 21983

---

## Complete Summary

### Terminal Setup (Keep all 3 running)

**Terminal 1 - Backend:**
```powershell
cd C:\Users\admin\Desktop\KodBank\backend
node server.js
```

**Terminal 2 - Frontend:**
```powershell
cd C:\Users\admin\Desktop\KodBank\frontend
npm start
```

**Terminal 3 - Commands (for testing, etc.)**

---

## Verify Everything is Working

| Component | URL | Status |
|-----------|-----|--------|
| Backend API | http://localhost:5000/api/health | Should return 200 ✅ |
| Frontend | http://localhost:3000 | Should show registration page ✅ |
| Register | POST /api/auth/register | Should create user ✅ |
| Login | POST /api/auth/login | Should generate JWT token ✅ |
| Dashboard | http://localhost:3000/dashboard | Should show after login ✅ |

---

## Production Deployment Notes

For production, you would:

1. **Build frontend:**
   ```powershell
   cd frontend
   npm run build
   ```
   Creates optimized build in `frontend/build/` folder

2. **Use environment variables** for sensitive data

3. **Use HTTPS** instead of HTTP

4. **Deploy backend** to cloud service (Heroku, AWS, DigitalOcean, etc.)

5. **Deploy frontend** build to hosting (Netlify, Vercel, GitHub Pages, etc.)

---

## Quick Commands Reference

| Command | Purpose |
|---------|---------|
| `node server.js` | Start backend |
| `npm start` | Start frontend dev server |
| `npm run build` | Build frontend for production |
| `taskkill /IM node.exe /F` | Kill all Node processes |
| `Invoke-WebRequest -Uri "http://localhost:5000/api/health"` | Test backend |

---

Still having issues? Check:
1. ✅ All 3 terminals open
2. ✅ Backend running (check for 🚀 message)
3. ✅ Frontend running (check for "Compiled successfully")
4. ✅ Browser on http://localhost:3000
5. ✅ Check browser console for errors (F12)
