const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { uname, password, email, phone } = req.body;
    
    // Validation
    if (!uname || !password || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }
    
    const connection = await pool.getConnection();
    
    // Check if username or email already exists
    const [existingUser] = await connection.execute(
      'SELECT * FROM KodUser WHERE username = ? OR email = ?',
      [uname, email]
    );
    
    if (existingUser.length > 0) {
      connection.release();
      return res.status(400).json({ 
        success: false, 
        message: 'Username or email already exists' 
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert user into database
    const [result] = await connection.execute(
      'INSERT INTO KodUser (username, email, password, phone, balance, role) VALUES (?, ?, ?, ?, 100000, ?)',
      [uname, email, hashedPassword, phone, 'customer']
    );
    
    connection.release();
    
    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully',
      userId: result.insertId
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error registering user',
      details: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }
    
    const connection = await pool.getConnection();
    
    // Fetch user
    const [users] = await connection.execute(
      'SELECT * FROM KodUser WHERE username = ?',
      [username]
    );
    
    if (users.length === 0) {
      connection.release();
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }
    
    const user = users[0];
    
    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      connection.release();
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }
    
    // Generate JWT token
    const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h', subject: user.username }
    );
    
    // Store token in database
    await connection.execute(
      'INSERT INTO UserToken (token, uid, expiry) VALUES (?, ?, ?)',
      [token, user.uid, expiryTime]
    );
    
    connection.release();
    
    // Set token as cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });
    
    res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      token: token,
      username: user.username
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error logging in' 
    });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ 
    success: true, 
    message: 'Logout successful' 
  });
});

module.exports = router;
