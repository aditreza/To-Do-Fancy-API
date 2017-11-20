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
  admin : {
    type : Boolean,
    default : false
  },
  via : String
})

const userModels = mongoose.model('Users', userSchema)
module.exports = userModels