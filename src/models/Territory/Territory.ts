import { DataTypes } from 'sequelize'
import sequelize from '../../db'
import { TerritoryInstance } from './interface'

export const Territory = sequelize.define<TerritoryInstance>('territory', {
	id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: true },
	territoryDescription: { type: DataTypes.STRING, allowNull: true }
})
