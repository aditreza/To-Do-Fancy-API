const ObjectId = require('mongodb').ObjectId
const Tasks = require('../models/taskModels')

let createTask = function(req,res){
  let newTask = Tasks({
    title : req.body.title,
    author : req.body.author
  })
  newTask.save().then(function(){
    res.status(201).send('1 Task Created')
  }).catch(function(err){
    res.status(500).send('error create task')
    console.log(err, '[-] create task')
  })
}

module.exports = {
  createTask
}