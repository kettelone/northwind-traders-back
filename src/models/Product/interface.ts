import { Optional, Model } from 'sequelize'

interface ProductAttributes {
	id: number
	productName: string
	quantityPerUnit: string
	unitPrice: number
	unitsInStock: number
	unitsOnOrder: number
	reorderLevel: number
	discontinued: number
	supplierId?: number
	categoryId?: number
	supplierName?: string
}

interface ProductCreationAttributes
	extends Optional<
			ProductAttributes,
			'supplierId' | 'categoryId' | 'supplierName'
		> {}
export interface ProductInstance
	extends Model<ProductAttributes, ProductCreationAttributes>,
		ProductAttributes {}
