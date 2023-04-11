import express from 'express'
import orderController from '../controller/employeeController'

const router = express.Router()

router.get('/all', orderController.getAll)
router.get('/one', orderController.getOne)

export default router
