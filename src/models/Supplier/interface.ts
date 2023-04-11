import { Model } from 'sequelize'

interface SupplierAttributes {
	id: number
	companyName: string
	contactName: string
	contactTitle: string
	address: string
	city: string
	region: string
	postalCode: string
	country: string
	phone: string
	fax: string
	homePage: string
	supplierName?: string
}

interface SupplierCreationAttributes extends SupplierAttributes {}
export interface SupplierInstance
	extends Model<SupplierAttributes, SupplierCreationAttributes>,
		SupplierAttributes {}
