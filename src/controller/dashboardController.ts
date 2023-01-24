import { Request, Response, NextFunction } from 'express'
import { EventEmitter } from 'events'
const emmiter = new EventEmitter()

class DashboardController {
	async getMessages(req: Request, res: Response, next: NextFunction) {
		emmiter.once('newMessage', (message) => {
			res.send(message)
		})
	}
	async newMessages(req: Request, res: Response, next: NextFunction) {
		res.send()
	}
}

const dashboardController = new DashboardController()

export { dashboardController, emmiter }
