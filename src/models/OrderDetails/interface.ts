import { Model } from 'sequelize'

//OrderDetail
interface OrderDetailAttributes {
	orderId: number
	productId: number
	unitPrice: number
	quantity: number
	discount: number
}

interface OrderDetailCreationAttributes extends OrderDetailAttributes {}
export interface OrderDetailInstance
	extends Model<OrderDetailAttributes, OrderDetailCreationAttributes>,
		OrderDetailAttributes {}
