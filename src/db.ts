import dotenv from 'dotenv'
dotenv.config()
import * as pg from 'pg'
import { Sequelize } from 'sequelize'

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
		logging: false
	}
)

export default sequelize
