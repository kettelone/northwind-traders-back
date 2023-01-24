import { Request, Response, NextFunction } from 'express'
import APIError from '../errors/apiError'
import supplierService from '../services/supplierService/supplierService'
class SupplierController {
	async getAllSuppliers(
		req: Request<any, any, any, { limit: string; page: string }>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { page, limit } = req.query
			const suppliers = await supplierService.getAll(page, limit)
			typeof suppliers === 'string'
				? next(APIError.notFound(suppliers))
				: res.send(suppliers)
			return
		} catch (e) {
			next(APIError.internal())
			return
		}
	}

	async getOneSupplier(
		req: Request<any, any, any, { id: number }>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id } = req.query
			const supplier = await supplierService.getOne(id)

			typeof supplier === 'string'
				? next(APIError.notFound(supplier))
				: res.send(supplier)
			return
		} catch (e) {
			next(APIError.internal())
			return
		}
	}
}

export default new SupplierController()
