const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // what collection to access
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, 'Please select a topic'],
        // products that are listed for support
        enum: ['Curriculum', 'Actiity Help', 'Medicine', 'CheckIn/CheckOut', 'Food']
    },
    description: {
        type: String,
        required: [true, 'Please enter a description of the issue'],
    },
    status: {
        type: String,
        required: true,
        // types of status for the tickets
        enum: ['new', 'open', 'closed'],
        // set the default of a ticket to new
        default: 'new',
    },
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Ticket', ticketSchema)