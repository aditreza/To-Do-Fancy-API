const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  fullname : String,
  username : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  email : {
    type : String,
    validate : {
      validator : function(email_validator){
        return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email_validator)
      },
      message : '{VALUE} is not a valid mail format, use: example@mail.com'
    }
  },
  phone : {
    type : String,
    validate : {
      validator : function(phone_validator){
        return /^.{6,}$/.test(phone_validator) 
      },
      message : '{VALUE} is not a valid phone number!\n Min 6 digit number'
    }
  },
  create_at : {
    type : Date,
    default : Date.now
  },
  via : String,
  admin : {
    type : Boolean,
    default : false
  }
})

const userModels = mongoose.model('Users', userSchema)
module.exports = userModels