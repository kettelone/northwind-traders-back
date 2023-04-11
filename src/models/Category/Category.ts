import { DataTypes } from 'sequelize' // DataTypes describes field types(String, Int,  Array ect.)
import sequelize from '../../db'
import { CategoryInstance } from './interface'

export const Category = sequelize.define<CategoryInstance>('category', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	categoryName: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false }
})
