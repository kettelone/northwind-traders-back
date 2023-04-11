import { Model } from 'sequelize'

interface EmployeeAttributes {
	id: number
	lastName: string
	firstName: string
	title: string
	titleOfCourtesy: string
	birthDate: Date
	hireDate: Date
	address: string
	city: string
	region: string
	postalCode: string
	country: string
	homePhone: string
	extension: number
	reportsTo: number
	notes: string
}

interface EmployeeCreationAttributes extends EmployeeAttributes {}

export interface EmployeeInstance
	extends Model<EmployeeAttributes, EmployeeCreationAttributes>,
		EmployeeAttributes {}
