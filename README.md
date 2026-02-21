# Kodbank - Digital Banking Application

A modern, full-stack banking application built with Node.js, Express, React, and MySQL. Users can register, login with JWT authentication, and check their account balance with a celebration animation.

## Features

✅ **User Registration** - Register with UID, Username, Email, Phone, and Password (Initial balance: ₹100,000)
✅ **JWT Authentication** - Secure login with JWT token generation and validation
✅ **Cookie-based Token Storage** - Tokens stored securely in cookies
✅ **Check Balance** - Authenticated users can check their account balance
✅ **Celebration Animation** - Confetti animation when balance is displayed
✅ **Responsive Design** - Works on desktop and mobile devices

## Project Structure

```
KodBank/
├── backend/
│   ├── middleware/
│   │   └── auth.js           # JWT verification middleware
│   ├── routes/
│   │   ├── auth.js           # Registration & Login routes
│   │   └── user.js           # User balance & profile routes
│   ├── db.js                 # Database connection & initialization
│   ├── server.js             # Main Express server
│   ├── package.json
│   └── .env                  # Environment variables
│
└── frontend/
    ├── public/
    │   └── index.html        # Main HTML file
    ├── src/
    │   ├── components/
    │   │   ├── Register.js    # Registration page
    │   │   ├── Login.js       # Login page
    │   │   ├── Dashboard.js   # User dashboard
    │   │   ├── Auth.css       # Auth styles
    │   │   └── Dashboard.css  # Dashboard styles
    │   ├── api.js             # API client
    │   ├── App.js             # Main App component
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- Aiven MySQL Database (credentials provided)

## Installation & Setup

### 1. Backend Setup

```bash
cd backend
npm install
```

The `.env` file is already configured with Aiven database credentials.

**Start the backend server:**

```bash
npm start
```

or for development with hot reload:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
```

**Start the React development server:**

```bash
npm start
```

The frontend will automatically open at `http://localhost:3000`

## API Endpoints

### Authentication Routes (POST)

- **`POST /api/auth/register`** - User registration
  - Body: `{ uid, uname, password, email, phone }`
  - Returns: Success message and user ID

- **`POST /api/auth/login`** - User login
  - Body: `{ username, password }`
  - Returns: JWT token and username
  - Sets: HttpOnly cookie with token

- **`POST /api/auth/logout`** - User logout
  - Clears: Authentication cookie

### User Routes (Protected - Requires JWT)

- **`GET /api/user/balance`** - Get account balance
  - Headers: Authorization with JWT token
  - Returns: User's current balance

- **`GET /api/user/profile`** - Get user profile
  - Headers: Authorization with JWT token
  - Returns: User details (uid, username, email, balance, phone, role)

## Database Schema

### KodUser Table
```sql
- uid (INT, Primary Key, Auto Increment)
- username (VARCHAR, Unique)
- email (VARCHAR, Unique)
- password (VARCHAR, Hashed with bcrypt)
- balance (DECIMAL, Default: 100000)
- phone (VARCHAR)
- role (ENUM: customer, manager, admin, Default: customer)
- created_at (TIMESTAMP)
```

### UserToken Table
```sql
- tid (INT, Primary Key, Auto Increment)
- token (LONGTEXT)
- uid (INT, Foreign Key)
- expiry (DATETIME)
- created_at (TIMESTAMP)
```

## User Flow

1. **Registration Page** (`/register`)
   - Enter UID, Username, Email, Password, Phone
   - Submit to create account with ₹100,000 initial balance
   - Redirected to login page

2. **Login Page** (`/login`)
   - Enter username and password
   - Backend validates credentials
   - Generate JWT token with username as subject and role as claim
   - Store token in database and set as cookie
   - Redirected to dashboard

3. **Dashboard** (`/dashboard`)
   - Welcome message with logged-in username
   - "Check Balance" button
   - Click button to fetch balance (token verification happens on backend)
   - Display balance with confetti animation
   - Logout button to end session

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token generation with secret key
- ✅ Token expiration (24 hours)
- ✅ HttpOnly cookies to prevent XSS attacks
- ✅ Token verification middleware on protected routes
- ✅ CORS enabled for local development

## Technology Stack

**Backend:**
- Node.js
- Express.js
- MySQL2
- JSON Web Token (JWT)
- bcryptjs

**Frontend:**
- React 18
- React Router DOM
- Axios
- React Confetti (for celebration animation)

**Database:**
- MySQL (Aiven Cloud)

## Environment Variables

Backend `.env` file (create this file in the backend folder):
```
DB_HOST=your_aiven_host.aivencloud.com
DB_PORT=21983
DB_USER=your_database_user
DB_PASSWORD=your_secure_password_here
DB_NAME=defaultdb
JWT_SECRET=kodbank_secret_key_2026_secure_signature
PORT=5000
CLIENT_URL=http://localhost:3000
```

**Note:** Never commit `.env` file to GitHub. It's protected by `.gitignore`. Keep your database credentials safe!

## Running the Application

**In one terminal - Start Backend:**
```bash
cd backend
npm start
```

**In another terminal - Start Frontend:**
```bash
cd frontend
npm start
```

Both servers will be running and communicating with each other.

## Default Test User

After running the application:

1. Go to `http://localhost:3000/register`
2. Fill in the registration form
3. You'll be redirected to login
4. Login with your credentials
5. Check your balance and enjoy the celebration! 🎉

## Features Implemented

✅ User Registration with Initial Balance
✅ JWT Authentication with Token Storage
✅ Secure Login with Password Validation
✅ Protected API Routes (Dashboard access)
✅ Balance Inquiry with JWT Verification
✅ Confetti Celebration Animation
✅ Responsive UI Design
✅ Cookie-based Token Management
✅ Database Schema with Foreign Keys
✅ Error Handling and Validation

## Troubleshooting

**Database Connection Error:**
- Verify Aiven credentials in `.env`
- Check internet connection
- Ensure firewall allows MySQL connection on port 21983

**CORS Error:**
- Ensure frontend URL in backend `.env` matches actual frontend URL
- Check if both servers are running

**Token Issues:**
- Clear browser cookies and localStorage
- Logout and login again
- Check token expiration time

## License

This project is for educational purposes.
