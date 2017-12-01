const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  title : {
    type : String,
    required : true,
    minlength : 1,
    trim : true
  },
  author : {
    type : Schema.ObjectId,
    ref : 'Users'
  },
  completed : {
    type : Boolean,
    default : false
  },
  id_date : String
})

const taskModels = mongoose.model('Tasks', taskSchema)
module.exports = taskModels