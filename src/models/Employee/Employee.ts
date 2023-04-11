import { DataTypes } from 'sequelize'
import sequelize from '../../db'
import { EmployeeInstance } from './interface'

export const Employee = sequelize.define<EmployeeInstance>('employee', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	lastName: { type: DataTypes.STRING, allowNull: true },
	firstName: { type: DataTypes.STRING, allowNull: true },
	title: { type: DataTypes.STRING, allowNull: true },
	titleOfCourtesy: { type: DataTypes.STRING, allowNull: true },
	birthDate: { type: DataTypes.DATE, allowNull: true },
	hireDate: { type: DataTypes.DATE, allowNull: true },
	address: { type: DataTypes.STRING, allowNull: true },
	city: { type: DataTypes.STRING, allowNull: true },
	region: { type: DataTypes.STRING, allowNull: true },
	postalCode: { type: DataTypes.STRING, allowNull: true },
	country: { type: DataTypes.STRING, allowNull: true },
	homePhone: { type: DataTypes.STRING, allowNull: true },
	extension: { type: DataTypes.INTEGER, allowNull: true },
	reportsTo: { type: DataTypes.INTEGER, allowNull: true },
	notes: { type: DataTypes.TEXT, allowNull: true }
})
