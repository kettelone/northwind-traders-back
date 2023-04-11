import express from 'express'
import customerController from '../controller/customerController'

const router = express.Router()

router.get('/all', customerController.getAllCustomers)
router.get('/one', customerController.getOneCustomer)

export default router
