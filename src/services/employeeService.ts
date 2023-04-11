import { Employee } from '../models/relations'
import { EmployeeInstance } from '../models/employee/interface'
import combineSearchData from '../utils/utils'

const { col, fn } = Employee.sequelize!

class EmployeeService {
	async getAll(page: string, limit: string) {
		const finalPage = +page || 1
		const finalLimit = +limit || 20
		const offset = finalPage * finalLimit - finalLimit

		let searchQuery: any = {}

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
			],
			benchmark: true,
			logging: (...data) => {
				searchQuery = data
			}
		})
		if (!employees) {
			return 'No employee found'
		}

		const searchData = combineSearchData(searchQuery, employees.rows.length)

		return { employees, searchData }
	}

	async getOne(id: number) {
		let searchQuery: any = {}

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
				[ fn('to_char', col('birthDate'), 'YYYY-MM-DD'), 'Birth Date' ],
				[ fn('to_char', col('hireDate'), 'YYYY-MM-DD'), 'Hire Date' ],
				[ 'address', 'Address' ],
				[ 'city', 'City' ],
				[ 'postalCode', 'Postal Code' ],
				[ 'country', 'Country' ],
				[ 'homePhone', 'Home Phone' ],
				[ 'extension', 'Extension' ],
				[ 'notes', 'Notes' ]
			],
			benchmark: true,
			logging: (...data) => {
				searchQuery = data
			}
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

		const searchData = combineSearchData(searchQuery, 1)
		if (!reportsTo) {
			return { employee, searchData }
		}

		return {
			employee: {
				...employee,
				...{ 'Reports To': reportsTo.fullName }
			},
			searchData
		}
	}
}

export default new EmployeeService()
