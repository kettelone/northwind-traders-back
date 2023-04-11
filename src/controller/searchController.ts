import { Request, Response, NextFunction } from 'express'
import APIError from '../errors/apiError'
import searchService from '../services/searchService'

class SearchController {
	public async findInfo(
		req: Request<any, any, any, { products?: any; customers?: any }>,
		res: Response,
		next: NextFunction
	) {
		try {
			const { products, customers } = req.query
			if (products) {
				const productsResult = await searchService.findProducts(products)

				if (!productsResult) {
					res.send('No results')
					return
				}
				res.send(productsResult)
				return
			}

			if (customers) {
				const customersResult = await searchService.findCustomers(customers)
				if (!customersResult) {
					res.send('No results')
					return
				}
				res.send(customersResult)
				return
			}
			return
		} catch (e) {
			next(APIError.internal())
		}
	}
}

export default new SearchController()
