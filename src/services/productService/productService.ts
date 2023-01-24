import { Product, Supplier } from '../../models/model'

class ProductService {
	async getAll(page: string, limit: string) {
		const finalPage = +page || 1
		const finalLimit = +limit || 20
		const offset = finalPage * finalLimit - finalLimit

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
			]
		})
		if (!products) {
			return 'Product was not found'
		}

		return products
	}

	async getOne(id: number) {
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
			]
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

		const keyValues = Object.entries(product.dataValues)
		keyValues.splice(1, 0, [ 'Supplier', supplier.companyName ])
		const finalProduct = Object.fromEntries(keyValues)
		return finalProduct
	}
}

export default new ProductService()
