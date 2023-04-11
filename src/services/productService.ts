import { Product, Supplier } from '../models/relations'
import combineSearchData from '../utils/utils'

class ProductService {
	async getAll(page: string, limit: string) {
		const finalPage = +page || 1
		const finalLimit = +limit || 20
		const offset = finalPage * finalLimit - finalLimit
		let searchQuery: any = {}

		const products = await Product.findAndCountAll({
			limit: finalLimit,
			offset,
			attributes: [
				'id',
				'productName',
				'quantityPerUnit',
				'unitPrice',
				'unitsInStock',
				'unitsOnOrder'
			],
			benchmark: true,
			logging: (...data) => {
				searchQuery = data
			}
		})
		if (!products) {
			return 'Product was not found'
		}

		const searchData = combineSearchData(searchQuery, products.rows.length)

		return { products, searchData }
	}

	async getOne(id: number) {
		let searchQuery: any = {}

		const product = await Product.findOne({
			where: { id },
			attributes: [
				[ 'productName', 'Product Name' ],
				[ 'quantityPerUnit', 'Quantity Per Unit' ],
				[ 'unitPrice', 'Unit Price' ],
				[ 'unitsInStock', 'Units In Stock' ],
				[ 'unitsOnOrder', 'Units In Order' ],
				[ 'reorderLevel', 'Reorder Level' ],
				[ 'discontinued', 'Discontinued' ],
				[ 'supplierId', 'supplierId' ]
			],
			logging: (...data) => {
				searchQuery = data
			}
		})
		if (!product) {
			return 'Product doesn`t exist'
		}
		const supplier = await Supplier.findOne({
			where: { id: product.supplierId }
		})
		if (!supplier) {
			return 'Supplier doesn`t exist'
		}

		const searchData = combineSearchData(searchQuery, 1)

		const keyValues = Object.entries(product.dataValues)
		keyValues.splice(1, 0, [ 'Supplier', supplier.companyName ])
		const finalProduct = Object.fromEntries(keyValues)

		return { finalProduct, searchData }
	}
}

export default new ProductService()
