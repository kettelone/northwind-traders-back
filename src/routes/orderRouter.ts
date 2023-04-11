import express from 'express'
import orderController from '../controller/orderController'

const router = express.Router()

router.get('/all', orderController.getAllOrders)
router.get('/one', orderController.getOneOrder)

export default router
