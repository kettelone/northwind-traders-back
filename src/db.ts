import dotenv from 'dotenv'
dotenv.config()
import * as pg from 'pg'
import { Sequelize } from 'sequelize'
import { emmiter } from './controller/dashboardController'

let searchQuery: any
const sequelize = new Sequelize(
	process.env.DB_NAME! || 'northwind_traders_db',
	process.env.DB_USERNAME! || 'postgres',
	process.env.DB_PASSWORD || 'guestdxb',
	{
		host:
			process.env.DB_HOST ||
			'northwind-traders-db.cozbnpykax7t.eu-west-1.rds.amazonaws.com',
		port: +process.env.DB_PORT! || 5432,
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
