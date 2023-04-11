import express from 'express'
import supplierRouter from './supplierRouter'
import productRoter from './productRouter'
import orderRouter from './orderRouter'
import employeeRouter from './employeeRoute'
import customerRouter from './customerRouter'
import searchRouter from './searchRouter'

const router = express.Router()

router.use('/supplier', supplierRouter)
router.use('/product', productRoter)
router.use('/order', orderRouter)
router.use('/employee', employeeRouter)
router.use('/customer', customerRouter)
router.use('/info', searchRouter)

export default router
