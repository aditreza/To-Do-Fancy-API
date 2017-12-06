const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const app = express()

// middleware
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// db connect
mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost/todoFancy').then(function(){
//   console.log('[+] success db connection')
// }).catch(function(err){
//   console.error(err)
// })
mongoose.connect('mongodb://bukabukaan:bukabukaan12#@clusterbukabukaan-shard-00-00-oefpr.mongodb.net:27017,clusterbukabukaan-shard-00-01-oefpr.mongodb.net:27017,clusterbukabukaan-shard-00-02-oefpr.mongodb.net:27017/todoFancy?ssl=true&replicaSet=ClusterBukabukaan-shard-0&authSource=admin').then(function(){
  console.log('[+] success db connection')
}).catch(function(err){
  console.error(err)
})

//routes
const index = require('./routes/index')
const tasks = require('./routes/task')
const users = require('./routes/user')

app.use('/', index)
app.use('/api/tasks', tasks)
app.use('/api/users', users)

//server listen
app.listen(PORT, function(err){
  if(!err){
    console.log(`[+] server listen on PORT ${PORT}`)
  }
})