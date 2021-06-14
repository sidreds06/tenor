const mongoose = require('mongoose')
const schema = mongoose.Schema

const Userschema = new schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true})
const User = mongoose.model('User',Userschema)
module.exports = User