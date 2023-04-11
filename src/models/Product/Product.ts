import { DataTypes } from 'sequelize' // DataTypes describes field types(String, Int,  Array ect.)
import sequelize from '../../db'
import { ProductInstance } from './interface'

export const Product = sequelize.define<ProductInstance>('product', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	productName: { type: DataTypes.STRING, allowNull: true },
	quantityPerUnit: { type: DataTypes.STRING, allowNull: true },
	unitPrice: { type: DataTypes.FLOAT, allowNull: true },
	unitsInStock: { type: DataTypes.INTEGER, allowNull: true },
	unitsOnOrder: { type: DataTypes.INTEGER, allowNull: true },
	reorderLevel: { type: DataTypes.INTEGER, allowNull: true },
	discontinued: { type: DataTypes.INTEGER, allowNull: true }
})
