// @desc Register a new user 
// @route /api/users
// @access Public 

const registerUser = (req, res) => {
    res.send('Regiester Route')
}

// @desc Login a new user 
// @route /api/login
// @access Public 
const loginUser = (req, res) => {
    res.send('Login Route')
}

module.exports = {
    registerUser, 
    loginUser,
}