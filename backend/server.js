// Use require('express') to import a library/module into your current file
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
// get ErrorHanlder from errorMiddleware 
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

// local port that we are running server on 
const PORT = process.env.PORT || 8080


// Connect to database
connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.status(200).json({message: 'Wecome to the Support Desk API'})
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))
app.use(errorHandler)


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
