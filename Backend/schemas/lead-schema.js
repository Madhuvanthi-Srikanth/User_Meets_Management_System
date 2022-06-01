const mongoose = require('mongoose')
const validation = require('validator')
const bcrypt = require('bcryptjs')


const leadSchema = mongoose.Schema({
    name : {
        type: String,
        required: 'Name is required',
        validate:{
            validator: (value)=>{
                return (/[a-z A-Z]/.test(value)) && !(/[^a-zA-Z\d\s:]/.test(value))
            }
        }
    },
    username:{
        type: String,
        minLength: 5,
        required : 'Username is required',
        immutable: true,
        unique: true,
        validate :{
            validator: (value)=>{
                return /[a-z A-Z 0-9]/.test(value) && !(/\W/.test(value))
            },
            message: 'Username is invalid'
        }
    },
    email: {
        type: String,
        required: 'Email is required',
        lowercase: true, 
        validate : {
            validator : async (value)=> { return await validation.isEmail(value) },
            message: "Invalid email"
        }
    },
    password:{
        type:String,
        required: 'Password is required',
        validate : {
            validator: (value)=>{
               return (/[a-z A-Z 0-9]/.test(value) && !/\s/.test(value))
            },
            message: "Invalid password",
        }
    },
    confirm_password:{
        type: String,
        required: 'Confirm your password',
        validate: {
            validator: function (value){
                return value===this.password
            },
            message: 'Passwords do not match'
        }
    },
    user_type:{
        type: String,
        default: 'lead'
    },
   
    createdAt: {
        type: Date,
        default: new Date(),
        immutable: true 
    }
})

leadSchema.pre('save', function(next) {
    //password hashing
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    
    this.confirm_password = undefined
   
    next()
});


module.exports = mongoose.model('leads', leadSchema, 'leads')