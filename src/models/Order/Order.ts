import { DataTypes } from 'sequelize' // DataTypes describes field types(String, Int,  Array ect.)
import sequelize from '../../db'
import { OrderInstance } from './interface'

export const Order = sequelize.define<OrderInstance>('order', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	orderDate: { type: DataTypes.DATE, allowNull: true },
	requiredDate: { type: DataTypes.DATE, allowNull: true },
	shippedDate: { type: DataTypes.DATE, allowNull: true },
	shipVia: { type: DataTypes.INTEGER, allowNull: true },
	freight: { type: DataTypes.FLOAT, allowNull: true },
	shipName: { type: DataTypes.STRING, allowNull: true },
	shipAddress: { type: DataTypes.STRING, allowNull: true },
	shipCity: { type: DataTypes.STRING, allowNull: true },
	shipRegion: { type: DataTypes.STRING, allowNull: true },
	shipPostalCode: { type: DataTypes.STRING, allowNull: true },
	shipCountry: { type: DataTypes.STRING, allowNull: true }
})
