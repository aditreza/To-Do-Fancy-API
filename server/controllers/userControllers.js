const ObjectId = require('mongodb').ObjectId
const Users = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const errmsg = require('../helper/handle_error_message_users')
require('dotenv').config()
const secret_key = process.env.secretKey


const createUser = function(req,res){
  // console.log(req)
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

// login user
const loginUsers = function(req,res){
  // console.log(req.body)
  Users.findOne({
    username: req.body.username
  }).then(function(data_User){
    console.log('data_User',data_User)
    if(data_User){
      bcrypt.compare(req.body.password, data_User.password).then(function(result){
        // console.log(result)
        if(result){
          console.log(data_User)
          jwt.sign({
            id : data_User.id,
            username : data_User.username
          }, secret_key, function(err, token){
            if(!err){
              console.log('this token >>', token)
              res.status(201).send({
                success: true,
                message: 'Enjoy your token!',
                token: token,
                username: data_User.fullname,
                user_Id:data_User.id
              })
            }
          })
        }
      })
    }
  }).catch(function(err){
    if(err){
      res.status(500).send(err)
      console.log(err)
    }
  })
}

// auto register user medsos
const createUserMedsos = function(req,res){
  let saltRound = 10
  bcrypt.hash(req.body.password, saltRound).then(function(hash){
    let newUser = Users({
      fullname : req.body.fullname,
      username : req.body.fullname.split(' ').join(''),
      password : hash,
      email : req.body.email,
      phone : '123456789',
      via : 'facebook'
    })
    // console.log(newUser)
    newUser.save().then(function(){
      res.status(201).send('[+] 1 User Created via Facebook')
    }).catch(function(err){
      Users.findOne({
        username : req.body.fullname.split(' ').join('')
      }).then(function(data_User){
        console.log(data_User, 'user fb registered')
        bcrypt.compare(req.body.password, data_User.password).then(function(result){
          // console.log(result)
          if(result){
            console.log(data_User)
            jwt.sign({
              id : data_User.id,
              username : data_User.username
            }, secret_key, function(err, token){
              if(!err){
                console.log('this token >>', token)
                res.status(201).send({
                  success: true,
                  message: 'Enjoy your token!',
                  token: token,
                  username: data_User.fullname,
                  user_Id:data_User.id
                })
              }
            })
          }
        })
      })
      // console.log('[-] error User Create')
      // res.status(500).send(errmsg(err))
    })
  }).catch(function(err){
    if(err){
      
      console.log('[-] password crypt')
      res.status(500).send(err)
    }
  })
}

// login via facebook
const loginViaFacebook = function(req,res){
  
}

module.exports = {
  createUser,
  findAllUsers,
  updateUser,
  destroyUser,
  loginUsers,
  createUserMedsos,
  loginViaFacebook
}