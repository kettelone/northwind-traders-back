import { Product, Customer } from '../../models/model'
const sequelize = require('sequelize')

class SearchService {
	async findProducts(products: string) {
		const result = await Product.findAndCountAll({
			where: {
				productName: sequelize.where(
					sequelize.fn('LOWER', sequelize.col('productName')),
					'LIKE',
					'%' + products.toLowerCase() + '%'
				)
			}
		})
		return result
	}

	async findCustomers(customers: string) {
		const result = await Customer.findAndCountAll({
			where: {
				companyName: sequelize.where(
					sequelize.fn('LOWER', sequelize.col('companyName')),
					'LIKE',
					'%' + customers.toLowerCase() + '%'
				)
			}
		})
		return result
	}
}

export default new SearchService()
