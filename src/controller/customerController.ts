import { Request, Response, NextFunction } from 'express'
import APIError from '../errors/apiError'
import customerService from '../services/customerService'

class CustomerController {
	public async getAllCustomers(
		req: Request<any, any, any, { page: string; limit: string }>,
		res: Response,
		next: NextFunction
	) {
		try {
			const { page, limit } = req.query
			const customers = await customerService.getAll(page, limit)
			typeof customers === 'string'
				? next(APIError.notFound(customers))
				: res.send(customers)
			return
		} catch (e) {
			next(APIError.internal())
			return
		}
	}

	public async getOneCustomer(
		req: Request<any, any, any, { id: number }>,
		res: Response,
		next: NextFunction
	) {
		try {
			const { id } = req.query
			const customer = await customerService.getOne(id)
			typeof customer === 'string'
				? next(APIError.notFound(customer))
				: res.send(customer)
			return
		} catch (e) {
			next(APIError.internal())
			return
		}
	}
}

export default new CustomerController()
