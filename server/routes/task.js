const express = require('express')
const router = express.Router()
const Task = require('../controllers/taskControllers')

router.post('/', Task.createTask)

module.exports = router