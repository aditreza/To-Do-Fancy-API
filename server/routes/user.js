const express = require('express')
const router = express.Router()
const User = require('../controllers/userControllers')

router.post('/', User.createUser)
router.get('/', User.findAllUsers)
router.put('/:id', User.updateUser)
router.delete('/:id', User.destroyUser)

module.exports = router