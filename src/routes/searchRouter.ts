import express from 'express'
import { Product, Customer } from '../models/relations'
import searchController from '../controller/searchController'
const router = express.Router()

router.get('/search', searchController.findInfo)

export default router
