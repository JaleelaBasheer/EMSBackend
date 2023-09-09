const express = require('express')
const userController = require('../controllers/userController')
const router = new express.Router()
const multerConfig = require('../middlewares/multermiddleware')

// add user
router.post('/add',multerConfig.single("profile"),userController.addUser)

// get all user
router.get('/get-all-users',userController.getUser)

// delete user
router.delete('/delete-user/:id',userController.deleteUser)

// edit user
router.put('/edit-user/:id',multerConfig.single('profile'),userController.editUser)

module.exports=router
