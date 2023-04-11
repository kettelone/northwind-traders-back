import express from 'express'
import supplierController from '../controller/supplierController'

const router = express.Router()

router.get('/all', supplierController.getAllSuppliers)
router.get('/one', supplierController.getOneSupplier)

export default router
