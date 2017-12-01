const ObjectId = require('mongodb').ObjectId
const Tasks = require('../models/taskModels')

const createTask = function(req,res){
  let newTask = Tasks({
    title : req.body.title,
    author : req.body.author,
    completed : req.body.completed,
    id_date : req.body.id_date
  })
  newTask.save().then(function(){
    res.status(201).send('1 Task Created')
  }).catch(function(err){
    res.status(500).send(err.errors.title.message)
    console.log(err, '[-] create task')
  })
}

const findAllTask = function(req,res){
  Tasks.find().populate('author').then(function(data_Tasks){
    console.log('[+] find all data Tasks')
    res.status(200).send(data_Tasks)
  }).catch(function(err){
    console.log(err, '[-] error find Users')
    res.status(500).send(err)
  })
}

const updateTask = function(req,res){
  // console.log(req.params)
  let id = {
    _id : ObjectId(req.params.id)
  }
  Tasks.findById(id).then(function(data_Tasks){
    // console.log(data_Tasks)
    data_Tasks.completed = !req.body.completed
    //save update
    data_Tasks.save().then(function(){
      console.log('[+] 1 Task Updated')
      res.status(201).send('[+] 1 Task Updated')
    }).catch(function(err){
      console.log('[-] error save update Tasks')
      res.status(500).send(err)
    })
  }).catch(function(err){
    console.log('[-] error find id in update Tasks')
    res.status(500).send(err)
  })
}

const toupdate = function(req,res){
  // console.log(req.body)
  Tasks.findOne({ 'id_date' : req.body.id_date }).then(function(data){
    // console.log('>>>', data, '<<<<')
    data.completed = req.body.completed
    data.save().then(function(dataup){
      // console.log(dataup)
      res.status(201).send('[+] 1 Task update by id_date')
    }).catch(function(err){
      console.log('[-] error findOne id date in update Tasks')
      res.status(500).send(err)
    })
  }).catch(function(err){
    console.log('[-] error findOne id date in update Tasks')
    res.status(500).send(err)
  })
}

const destroyTask = function(req,res){
  // console.log(req.params)
  let id = {
    _id : ObjectId(req.params.id)
  }
  Tasks.findByIdAndRemove(id).then(function(){
    res.status(201).send('[+] 1 Task Deleted')
  }).catch(function(err){
    console.log(err, '[-] error delete Task')
    res.status(500).send(err)
  })
}

const todelete = function(req,res){
  // console.log(req.body.id_date)
  Tasks.findOneAndRemove({'id_date' : req.body.id_date}).then(function(){
    console.log('[+] 1 Task delete by id_date')
    res.status(201).send('[+] 1 Task Task delete by id_date')
  }).catch(function(err){
    console.log('[-] error find id date in delete Tasks')
    res.status(500).send(err)
  })
}

module.exports = {
  createTask,
  findAllTask,
  updateTask,
  destroyTask,
  todelete,
  toupdate
}