# 🚀 How to Run Kodbank Backend & Frontend

## **Prerequisites**
- ✅ Node.js installed (`node --version`)
- ✅ npm installed (`npm --version`)
- ✅ Internet connection (for database)

---

## **Method 1: Running Both Servers (Recommended)**

### **Terminal 1 - Start Backend Server**

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

**✅ Backend is now running!** Keep this terminal open.

---

### **Terminal 2 - Start Frontend Server**

Open a **NEW PowerShell terminal** and run:

```powershell
cd C:\Users\admin\Desktop\KodBank\frontend
npm start
```

**Wait 1-2 minutes for compilation...**

**Expected Output:**
```
Compiled successfully!

You can now view kodbank-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

**✅ Frontend is now running!** Browser should automatically open.

---

## **Step 3: Access the Application**

🌐 **Open in Browser:** http://localhost:3000

You should see:
- 📱 Black background with yellow accents
- 💰 Money and credit card emojis
- 📝 Registration form

---

## **Common Issues & Solutions**

### ❌ **Error: Port 5000 Already in Use**

```powershell
# Option 1: Kill all Node processes
taskkill /IM node.exe /F

# Then start backend again
cd C:\Users\admin\Desktop\KodBank\backend
node server.js
```

```powershell
# Option 2: Use a different port
# Edit backend/.env and change PORT=5000 to PORT=5001
# Then start backend
```

---

### ❌ **Error: Cannot find module**

```powershell
# Reinstall dependencies
cd C:\Users\admin\Desktop\KodBank\backend
rm -r node_modules
npm install

# Then start
node server.js
```

---

### ❌ **Error: Frontend says "Network Error"**

```powershell
# Check if backend is running
# Terminal 1 should show the startup message

# If not running, start it:
cd C:\Users\admin\Desktop\KodBank\backend
node server.js

# Then refresh frontend browser (Ctrl+R or F5)
```

---

### ❌ **Error: npm command not found**

```powershell
# Reinstall Node.js from https://nodejs.org
# Download LTS version
# Run installer
# Restart PowerShell

# Verify installation
node --version
npm --version
```

---

## **Step-by-Step Testing**

Once both servers are running:

### **1. Register User**
- Go to http://localhost:3000
- Fill registration form:
  - Username: `testuser2025`
  - Email: `test@kodbank.com`
  - Password: `Test@1234`
  - Phone: `9876543210`
- Click Register
- See success message

### **2. Login**
- You'll be redirected to login page
- Enter same username & password
- Click Login

### **3. Check Balance**
- See dashboard with "Check Balance" button
- Click it
- See balance: ₹100,000.00
- Watch confetti animation! 🎊

---

## **Terminal Layout**

```
┌─ Terminal 1 ────────────────────┐
│ Backend Server (port 5000)      │
│ cd backend                       │
│ node server.js                   │
│                                  │
│ 🚀 Running on :5000             │
└──────────────────────────────────┘

┌─ Terminal 2 ────────────────────┐
│ Frontend Server (port 3000)      │
│ cd frontend                      │
│ npm start                        │
│                                  │
│ 🚀 Running on :3000             │
│ 🌐 http://localhost:3000        │
└──────────────────────────────────┘
```

---

## **Quick Commands Reference**

| Command | What It Does |
|---------|------------|
| `cd C:\Users\admin\Desktop\KodBank\backend` | Go to backend folder |
| `node server.js` | Start backend server |
| `cd C:\Users\admin\Desktop\KodBank\frontend` | Go to frontend folder |
| `npm start` | Start frontend dev server |
| `npm install` | Install dependencies |
| `taskkill /IM node.exe /F` | Kill all Node processes |
| `Ctrl+C` | Stop current server (in terminal) |

---

## **Verify Everything is Working**

### **Test Backend**

In a third terminal, run:

```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/health"
```

**Expected Response:**
```
StatusCode        : 200
Content           : {"success":true,"message":"Server is running"}
```

---

## **How Data Flows**

```
1. User opens http://localhost:3000
   ↓
2. Registration form sent to http://localhost:5000/api/auth/register
   ↓
3. Backend validates & creates user in MySQL database
   ↓
4. User logs in
   ↓
5. Backend generates JWT token & stores in UserToken table
   ↓
6. Frontend stores token in localStorage & cookie
   ↓
7. User clicks "Check Balance"
   ↓
8. Frontend sends token to http://localhost:5000/api/user/balance
   ↓
9. Backend verifies token & fetches balance from database
   ↓
10. Frontend displays balance with confetti animation 🎊
```

---

## **Development Tips**

✨ **Hot Reload:** Frontend automatically reloads when you save files

✨ **Console Logging:** Backend logs every request to terminal

✨ **Check Console:** Press F12 in browser to see frontend console

✨ **Check Terminal:** Look at backend terminal for any errors

---

## **Production Build** (Optional)

```powershell
# Build optimized frontend
cd C:\Users\admin\Desktop\KodBank\frontend
npm run build

# Creates optimized build in frontend/build/ folder
```

---

## **Summary**

1. ✅ Open Terminal 1 → `cd backend` → `node server.js`
2. ✅ Open Terminal 2 → `cd frontend` → `npm start`
3. ✅ Open Browser → `http://localhost:3000`
4. ✅ Test registration, login, and balance check
5. ✅ **Keep both terminals open!**

---

**Ready? Let's go! 🚀**

```powershell
# Terminal 1
cd C:\Users\admin\Desktop\KodBank\backend && node server.js

# Terminal 2 (new)
cd C:\Users\admin\Desktop\KodBank\frontend && npm start
```
