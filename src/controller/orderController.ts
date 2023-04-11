import { Request, Response, NextFunction } from 'express'
import APIError from '../errors/apiError'
import orderService from '../services/orderService'
class OrderClass {
	public async getAllOrders(
		req: Request<any, any, any, { limit: string; page: string }>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { page, limit } = req.query
			const orders = await orderService.findOrders(page, limit)
			if (!orders) {
				next(APIError.notFound('No orders found'))
				return
			}
			res.send(orders)
			return
		} catch (e) {
			console.log(e)
		}
	}

	public async getOneOrder(
		req: Request<any, any, any, { id: number }>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id } = req.query
			const finalInfo = await orderService.findOne(id)
			typeof finalInfo === 'string'
				? next(APIError.notFound(finalInfo))
				: res.send(finalInfo)
			return
		} catch (e) {
			console.log(e)
		}
	}
}

export default new OrderClass()
