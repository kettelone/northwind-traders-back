import { Request, Response, NextFunction } from 'express'
import APIError from '../errors/apiError'
import supplierService from '../services/supplierService'
class SupplierController {
	public async getAllSuppliers(
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

	public async getOneSupplier(
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
