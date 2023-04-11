import express from 'express'
import productController from '../controller/productController'

const router = express.Router()

router.get('/all', productController.getAllProducts)
router.get('/one', productController.getOneProduct)

export default router
