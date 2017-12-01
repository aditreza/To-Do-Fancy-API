const express = require('express')
const router = express.Router()
const Task = require('../controllers/taskControllers')

router.post('/', Task.createTask)
router.post('/todelete', Task.todelete)
router.get('/', Task.findAllTask)
router.put('/:id', Task.updateTask)
router.delete('/:id', Task.destroyTask)

module.exports = router