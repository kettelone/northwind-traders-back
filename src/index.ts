import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express, { Express } from 'express'
import sequelize from './db'
import router from './routes/index'
import apiErrorHandler from './middleware/errorHandling'
const PORT = process.env.PORT || 3000
const app: Express = express()

app.use(cors()) // enables to send requests from the browser
app.use(express.json()) // enables to parse json format
app.use('/api', router)
app.use(apiErrorHandler) // Error handler middleware. Should be the last middleware
app.get('/', (req, res) => {
	res.send('Connected to Northwind Traders')
})
const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync() // checks database state with schema
		// sync({ force: true }) - deletes everything!!!
		app.listen(PORT, async () => {
			console.log(`Server started on port ${PORT}`)
		})
	} catch (e) {
		console.log(e)
	}
}

start()
