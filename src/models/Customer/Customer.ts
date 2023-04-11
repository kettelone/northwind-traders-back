import { DataTypes } from 'sequelize'
import sequelize from '../../db'
import { CustomerInstance } from './interface'

export const Customer = sequelize.define<CustomerInstance>('customer', {
	id: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	companyName: { type: DataTypes.STRING, allowNull: true },
	contactName: { type: DataTypes.STRING, allowNull: true },
	contactTitle: { type: DataTypes.STRING, allowNull: true },
	address: { type: DataTypes.STRING, allowNull: true },
	city: { type: DataTypes.STRING, allowNull: true },
	region: { type: DataTypes.STRING, allowNull: true },
	postalCode: { type: DataTypes.STRING, allowNull: true },
	country: { type: DataTypes.STRING, allowNull: true },
	phone: { type: DataTypes.STRING, allowNull: true },
	fax: { type: DataTypes.STRING, allowNull: true }
})
