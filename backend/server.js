// Use require('express') to import a library/module into your current file
const express = require('express')
const path = require('path')
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



// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Server frontend
if(process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
    app.get('/', (req, res) => {
        res.status(200).json({message: 'Wecome to the Support Desk API'})
    })
}
app.use(errorHandler)


app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });