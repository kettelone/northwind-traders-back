import { Employee } from '../../models/model'
import { EmployeeInstance } from '../../models/interfaces'
const { col, fn } = Employee.sequelize!
class EmployeeService {
	async getAll(page: string, limit: string) {
		const finalPage = +page || 1
		const finalLimit = +limit || 20
		const offset = finalPage * finalLimit - finalLimit

		const employees = await Employee.findAndCountAll({
			limit: finalLimit,
			offset,
			attributes: [
				'id',
				[ fn('concat', col('firstName'), ' ', col('lastName')), 'fullName' ],
				'title',
				'city',
				'homePhone',
				'country'
			]
		})
		if (!employees) {
			return 'No employee found'
		}

		return employees
	}

	async getOne(id: number) {
		interface EmployeeUpdated extends EmployeeInstance {
			reportsToPersonId?: number
			fullName?: string
		}
		const employee: EmployeeUpdated | null = await Employee.findOne({
			raw: true,
			where: { id },
			attributes: [
				[ 'reportsTo', 'reportsToPersonId' ],
				[ fn('concat', col('firstName'), ' ', col('lastName')), 'Name' ],
				[ 'title', 'Title' ],
				[ 'titleOfCourtesy', 'Title Of Courtesy' ],
				[ 'birthDate', 'Birth Date' ],
				[ 'hireDate', 'Hire Date' ],
				[ 'address', 'Address' ],
				[ 'city', 'City' ],
				[ 'postalCode', 'Postal Code' ],
				[ 'country', 'Country' ],
				[ 'homePhone', 'Home Phone' ],
				[ 'extension', 'Extension' ],
				[ 'notes', 'Notes' ]
			]
		})

		if (!employee) {
			return 'Employee not found'
		}

		const reportsTo: EmployeeUpdated | null = await Employee.findOne({
			raw: true,
			where: { id: employee.reportsToPersonId },
			attributes: {
				include: [
					[ fn('concat', col('firstName'), ' ', col('lastName')), 'fullName' ]
				]
			}
		})
		if (!reportsTo) {
			return employee
		}

		return {
			...employee,
			...{ 'Reports To': reportsTo.fullName }
		}
	}
}

export default new EmployeeService()
