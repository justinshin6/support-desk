const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  // initialize token 
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header where token will be second element in list 
      token = req.headers.authorization.split(' ')[1]
      // Verify token with JWT_SECRET environment variable 
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized')
  }
})

module.exports = { protect }