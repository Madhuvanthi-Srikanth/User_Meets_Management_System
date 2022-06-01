const mongoose = require('mongoose')

const meetSchema = mongoose.Schema({
    client_username: 
    {
        type: String,
        required: true
    },
   
    
    time: 
    {
        type: Date,
        immutable: true
    },
    problem: 
    {
        type: String,
        required: true
    },
    
    createdAt:{
        type: Date,
        default: new Date(),
        immutable: true
    }
})

module.exports = mongoose.model('meets', meetSchema, 'meets')