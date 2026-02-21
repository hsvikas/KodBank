const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

console.log('📦 Loading routes...');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

console.log('✅ Routes loaded successfully');

const app = express();

// Middleware
console.log('🔧 Setting up middleware...');
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
console.log('✅ Middleware configured');

// Routes
console.log('📍 Registering routes...');
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Kodbank Backend Server running on http://localhost:${PORT}\n`);
  console.log(`📝 API Endpoints:`);
  console.log(`   POST   /api/auth/register`);
  console.log(`   POST   /api/auth/login`);
  console.log(`   POST   /api/auth/logout`);
  console.log(`   GET    /api/user/balance (protected)`);
  console.log(`   GET    /api/user/profile (protected)\n`);
});
