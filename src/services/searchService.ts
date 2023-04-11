import { Product, Customer } from '../models/relations'
const sequelize = require('sequelize')
import combineSearchData from '../utils/utils'

class SearchService {
	async findProducts(products: string) {
		let searchQuery: any = {}

		const result = await Product.findAndCountAll({
			where: {
				productName: sequelize.where(
					sequelize.fn('LOWER', sequelize.col('productName')),
					'LIKE',
					'%' + products.toLowerCase() + '%'
				)
			},
			benchmark: true,
			logging: (...data) => {
				searchQuery = data
			}
		})
		const searchData = combineSearchData(searchQuery, result.rows.length)
		return { result, searchData }
	}

	async findCustomers(customers: string) {
		let searchQuery: any = {}

		const result = await Customer.findAndCountAll({
			where: {
				companyName: sequelize.where(
					sequelize.fn('LOWER', sequelize.col('companyName')),
					'LIKE',
					'%' + customers.toLowerCase() + '%'
				)
			},
			benchmark: true,
			logging: (...data) => {
				searchQuery = data
			}
		})
		const searchData = combineSearchData(searchQuery, result.rows.length)

		return { result, searchData }
	}
}

export default new SearchService()
