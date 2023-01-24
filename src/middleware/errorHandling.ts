import { NextFunction, Request, Response } from 'express'
import APIError from '../errors/apiError'

function apiErrorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	// in prod do not use console.log or console.err because it is not async

	if (err instanceof APIError) {
		console.log('Errror message is: ', err.message)
		res.status(err.code).send(err.message)
		return
	}

	res.status(500).json('Generic server error')
}

export default apiErrorHandler
