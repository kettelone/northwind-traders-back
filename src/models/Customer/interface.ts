import { Model } from 'sequelize'

interface CustomerAttributes {
	id: string
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
}

interface CustomerCreationAttributes extends CustomerAttributes {}
export interface CustomerInstance
	extends Model<CustomerAttributes, CustomerCreationAttributes>,
		CustomerAttributes {}
