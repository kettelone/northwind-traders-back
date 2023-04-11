import { DataTypes } from 'sequelize'
import sequelize from '../../db'
import { RegionInstance } from './interface'

export const Region = sequelize.define<RegionInstance>('region', {
	id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: true },
	regionDescription: { type: DataTypes.STRING, allowNull: true }
})
