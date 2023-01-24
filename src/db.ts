import dotenv from 'dotenv'
dotenv.config()
import * as pg from 'pg'
import { Sequelize } from 'sequelize'
import { emmiter } from './controller/dashboardController'

let searchQuery: any

const sequelize = new Sequelize(
	process.env.DB_NAME!,
	process.env.DB_USERNAME!,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		port: +process.env.DB_PORT!,
		dialect: 'postgres',
		dialectModule: pg,
		define: {
			timestamps: false
		},
		benchmark: true,
		logging: (...msg) => {
			searchQuery = { msg }
			emmiter.emit('newMessage', searchQuery)
		}
	}
)

export default sequelize
