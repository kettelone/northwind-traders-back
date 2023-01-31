import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express, { Express } from 'express'
import sequelize from './db'
import router from './routes/index'
import apiErrorHandler from './middleware/errorHandling'
const PORT = process.env.PORT || 3000
const app: Express = express()

app.use(cors()) // чтобы можно было отправлять запросы с браузера
app.use(express.json()) // чтобы приложение могло парсить json формат
app.use('/api', router)
app.use(apiErrorHandler) // Error handler middleware. Shoud be the last middleware
app.get('/', (req, res) => {
	res.send('Connected to Northwind Traders')
})
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
