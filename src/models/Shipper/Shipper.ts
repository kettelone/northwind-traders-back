import { DataTypes } from 'sequelize'
import sequelize from '../../db'
import { ShipperInstance } from './interface'

export const Shipper = sequelize.define<ShipperInstance>('shipper', {
	id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: true },
	companyName: { type: DataTypes.STRING, allowNull: true },
	phone: { type: DataTypes.STRING, allowNull: true }
})
