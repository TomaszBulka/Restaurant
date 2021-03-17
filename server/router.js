const express = require('express')
const router = express.Router()
const opinionController = require('./controllers/opinionController')
const positionContoller = require('./controllers/positionController')
const userController = require('./controllers/userController')
const orderController = require('./controllers/orderController')

//user routes

router.post('/users', userController.createUser)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/users', userController.getUser)

// positions.routes
router.get('/positions', positionContoller.getPositions)

// opinions routes

router.get('/opinions', opinionController.getOpinions)
router.post('/opinions', opinionController.create)

//order routes
router.post('/orders', orderController.createOrder)
router.get('/orders', orderController.findUsersOrders)
router.get('/sum', orderController.getSumOfUsersOrders )
router.get('/currentOrder', orderController.findCurrentOrder)
router.post('/currentOrder', orderController.addAddress)
router.post('/payment', orderController.payAndRefresh)

module.exports = router