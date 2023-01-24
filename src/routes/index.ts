import express from 'express'
import supplierRouter from './supplierRouter/supplierRouter'
import productRoter from './productRouter/productRouter'
import orderRouter from './orderRouter/orderRouter'
import employeeRouter from './employeeRoute/employeeRoute'
import customerRouter from './customerRouter/customerRouter'
import searchRouter from './searchRouter/searchRouter'
import dashboardRouter from './dashboardRouter/dashboardRouter'

const router = express.Router()

router.use('/supplier', supplierRouter)
router.use('/product', productRoter)
router.use('/order', orderRouter)
router.use('/employee', employeeRouter)
router.use('/customer', customerRouter)
router.use('/info', searchRouter)
router.use('/dash', dashboardRouter)

export default router
