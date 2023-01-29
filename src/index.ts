import dotenv from 'dotenv'
import cors from 'cors'
import express, { Express } from 'express'
import sequelize from './db'
import router from './routes/index'
import apiErrorHandler from './middleware/errorHandling'

dotenv.config()

const app: Express = express()
app.use(cors()) // чтобы можно было отправлять запросы с браузера
app.use(express.json()) // чтобы приложение могло парсить json формат
app.get('/', (req, res) => {
	res.send('Northwind Traders')
})
app.use('/api', router)
app.use(apiErrorHandler) // Error handler middleware. Shoud be the last middleware

const PORT = process.env.PORT || 5000

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync() // будет сверят состояние базы данных со схемой данных
		// sync({ force: true }) - deletes everything!!!
		app.listen(PORT, async () => {
			console.log(`Server started on port ${PORT}`)
		})
	} catch (e) {
		console.log(e)
	}
}

start()
