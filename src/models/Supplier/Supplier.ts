import { DataTypes } from 'sequelize' // DataTypes describes field types(String, Int,  Array ect.)
import sequelize from '../../db'
import { SupplierInstance } from './interface'

export const Supplier = sequelize.define<SupplierInstance>('supplier', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
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
	fax: { type: DataTypes.STRING, allowNull: true },
	homePage: { type: DataTypes.STRING, allowNull: true }
})
