const ObjectId = require('mongodb').ObjectId
const Users = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const errmsg = require('../helper/handle_error_message_users')
require('dotenv').config()
const secret_key = process.env.secretKey


const createUser = function(req,res){
  let saltRound = 10
  bcrypt.hash(req.body.password, saltRound).then(function(hash){
    let newUser = Users({
      fullname : req.body.fullname,
      username : req.body.username,
      password : hash,
      email : req.body.email,
      phone : req.body.phone,
      via : 'register'
    })
    newUser.save().then(function(){
      res.status(201).send('[+] 1 User Created')
    }).catch(function(err){
      console.log('[-] error User Create')
      res.status(500).send(errmsg(err))
    })
  }).catch(function(err){
    if(err){
      console.log('[-] password crypt')
      res.status(500).send(err)
    }
  })
}

const findAllUsers = function(req,res){
  Users.find().then(function(data_Users){
    res.status(200).send(data_Users)
  }).catch(function(err){
    console.log(err, '[-] find Users')
    res.status(500).send(err)
  })
}

const updateUser = function(req,res){
  let saltRound = 10
  bcrypt.hash(req.body.password, saltRound).then(function(hash){
    let id = {
      _id : ObjectId(req.params.id)
    }
    Users.findById(id).then(function(data_Users){
      data_Users.fullname = req.body.fullname,
      data_Users.username = req.body.username,
      data_Users.password = hash,
      data_Users.email = req.body.email,
      data_Users.phone = req.body.phone
      
      //save update
      data_Users.save().then(function(){
        res.status(201).send('[+] 1 User Updated')
      }).catch(function(err){
        console.log('[-] error User Update')
        res.status(500).send(errmsg(err))
      })
    })
  }).catch(function(err){
    console.log('[-] update password crypt')
    res.status(500).send(err)
  })
}

const destroyUser = function(req,res){
  let id = {
    _id : ObjectId(req.params.id)
  }
  Users.findByIdAndRemove(id).then(function(){
    res.status(201).send('[+] 1 User Deleted')
  }).catch(function(err){
    console.log('[-] error User Deleted')
    res.status(500).send(err)
  })
}

module.exports = {
  createUser,
  findAllUsers,
  updateUser,
  destroyUser
}