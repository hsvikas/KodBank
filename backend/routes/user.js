const express = require('express');
const pool = require('../db');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

// Get user balance
router.get('/balance', verifyToken, async (req, res) => {
  try {
    const username = req.user.username;
    
    const connection = await pool.getConnection();
    
    // Fetch user balance
    const [users] = await connection.execute(
      'SELECT balance FROM KodUser WHERE username = ?',
      [username]
    );
    
    connection.release();
    
    if (users.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      balance: users[0].balance,
      message: 'Balance retrieved successfully'
    });
  } catch (error) {
    console.error('Balance fetch error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching balance' 
    });
  }
});

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const username = req.user.username;
    
    const connection = await pool.getConnection();
    
    const [users] = await connection.execute(
      'SELECT uid, username, email, balance, phone, role FROM KodUser WHERE username = ?',
      [username]
    );
    
    connection.release();
    
    if (users.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      user: users[0]
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching profile' 
    });
  }
});

module.exports = router;
