import { Request, Response, NextFunction } from 'express'
import APIError from '../errors/apiError'
import employeeService from '../services/employeeService'

class EmployeeController {
	public async getAll(
		req: Request<any, any, any, { page: string; limit: string }>,
		res: Response,
		next: NextFunction
	) {
		try {
			const { page, limit } = req.query
			const employees = await employeeService.getAll(page, limit)
			typeof employees === 'string'
				? next(APIError.notFound(employees))
				: res.send(employees)
			return
		} catch (e) {
			next(APIError.internal())
			return
		}
	}

	public async getOne(
		req: Request<any, any, any, { id: number }>,
		res: Response,
		next: NextFunction
	) {
		try {
			const { id } = req.query
			const employee = await employeeService.getOne(id)
			typeof employee === 'string'
				? next(APIError.notFound(employee))
				: res.send(employee)
			return
		} catch (e) {
			console.log(e)
			next(APIError.internal())
			return
		}
	}
}

export default new EmployeeController()
