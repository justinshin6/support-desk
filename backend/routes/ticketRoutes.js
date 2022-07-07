const express = require('express')
const router = express.Router()
const {getTickets, getTicket, createTicket, deleteTicket, updateTicket} = require('../controllers/ticketController')
const {protect} = require('../middleware/authMiddleware')

// Re-route into note router 
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

// in order to get user tickets, you need to be authenticated (protected)
router.get('/', protect, getTickets)
router.post('/', protect, createTicket)

router.route('/').get(protect, getTickets).post(protect, createTicket)

router.route('/:id').get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket)

module.exports = router