import { Optional, Model } from 'sequelize'

interface OrderAttributes {
	id: number
	orderDate: Date
	requiredDate: Date
	shippedDate: Date
	shipVia: number
	freight: number
	shipName: string
	shipAddress: string
	shipCity: string
	shipRegion: string
	shipPostalCode: string
	shipCountry: string
	customerId?: number
	employeeId?: number
}

interface OrderCreationAttributes
	extends Optional<OrderAttributes, 'customerId' | 'employeeId'> {}
export interface OrderInstance
	extends Model<OrderAttributes, OrderCreationAttributes>,
		OrderAttributes {}
