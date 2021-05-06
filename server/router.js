const express = require('express')
const router = express.Router()
const opinionController = require('./controllers/opinionController')
const positionController = require('./controllers/positionController')
const userController = require('./controllers/userController')
const orderController = require('./controllers/orderController')
const infoController = require('./controllers/infoController')
//user routes

router.post('/users', userController.createUser)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/users', userController.getUser)

// positions.routes
router.get('/positions', positionController.getPositions)
router.post('/positions', positionController.createPosition)
router.get('/single-position/:_id', positionController.findPositionById)
router.put('/single-position', positionController.updatePosition)
router.post('/delete-position', positionController.deletePosition)

// opinions routes

router.get('/opinions', opinionController.getOpinions)
router.post('/opinions', opinionController.create)

//order routes
router.post('/orders', orderController.createOrder)
router.get('/orders', orderController.findUsersOrders)
router.post('/realize-order', orderController.markAsRealized)
router.get('/sum', orderController.getSumOfUsersOrders )
router.get('/currentOrder', orderController.findCurrentOrder)
router.post('/currentOrder', orderController.addAddress)
router.post('/payment', orderController.payAndRefresh)
router.get('/latest', orderController.latestOrders)

// info routes
router.put('/info', infoController.updateInfo)
router.get('/info', infoController.getInfo)

module.exports = router