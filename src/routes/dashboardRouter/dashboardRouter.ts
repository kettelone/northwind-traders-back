import express from 'express'
import { dashboardController } from '../../controller/dashboardController'

const router = express.Router()

router.get('/get-messages', dashboardController.getMessages)
router.post('/new-messages', dashboardController.newMessages)

export default router
