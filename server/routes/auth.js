const express = require('express');
const { body, validationResult } = require("express-validator");
const { handleRegister,handleLogin } = require('../controllers/auth');

const registrationRules = () => [
    body('name').notEmpty(),
    body('email').trim().isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 5 }).withMessage('Must be at least 5 chars long'),
];
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(),isAuthenticated: false });
    }
    next();
  };
const router = express.Router();
router.post('/login',handleLogin);
router.post('/register', registrationRules(), validate ,handleRegister);
module.exports = router;