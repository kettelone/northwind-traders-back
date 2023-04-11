import { Request, Response, NextFunction } from 'express'
import APIError from '../errors/apiError'
import productService from '../services/productService'

class ProductController {
	public async getAllProducts(
		req: Request<any, any, any, { limit: string; page: string }>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { page, limit } = req.query
			const products = await productService.getAll(page, limit)
			typeof products === 'string'
				? next(APIError.notFound(products))
				: res.send(products)
			return
		} catch (e) {
			next(APIError.internal())
		}
	}

	public async getOneProduct(
		req: Request<any, any, any, { id: number }>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id } = req.query
			const finalProduct = await productService.getOne(id)
			typeof finalProduct === 'string'
				? next(APIError.notFound(finalProduct))
				: res.send(finalProduct)
			return
		} catch (e) {
			console.log(e)
			next(APIError.internal())
		}
	}
}

export default new ProductController()
