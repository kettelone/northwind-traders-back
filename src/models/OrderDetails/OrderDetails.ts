import { DataTypes } from 'sequelize'
import sequelize from '../../db'
import { OrderDetailInstance } from './interface'

export const OrderDetail = sequelize.define<
	OrderDetailInstance
>('orderDetail', {
	orderId: { type: DataTypes.INTEGER, allowNull: false },
	productId: { type: DataTypes.INTEGER, allowNull: false },
	unitPrice: { type: DataTypes.FLOAT, allowNull: true },
	quantity: { type: DataTypes.INTEGER, allowNull: true },
	discount: { type: DataTypes.FLOAT, allowNull: true }
})
