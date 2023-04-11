import { Customer } from '../models/relations'
import combineSearchData from '../utils/utils'

class CustomerService {
	async getAll(page: string, limit: string) {
		const finalPage = +page || 1
		const finalLimit = +limit || 20
		const offset = finalPage * finalLimit - finalLimit
		let searchQuery: any = {}

		const customers = await Customer.findAndCountAll({
			limit: finalLimit,
			offset,
			attributes: {
				exclude: [ 'address', 'region', 'postalCode', 'phone', 'fax' ]
			},
			benchmark: true,
			logging: (...data) => {
				searchQuery = data
			}
		})
		if (!customers) {
			return 'No customers found'
		}

		const searchData = combineSearchData(searchQuery, customers.rows.length)
		return { customers, searchData }
	}

	async getOne(id: number) {
		let searchQuery: any = {}

		const customer = await Customer.findOne({
			where: { id },
			attributes: [
				[ 'companyName', 'Company Name' ],
				[ 'contactName', 'Contact Name' ],
				[ 'contactTitle', 'Contact Title' ],
				[ 'address', 'Address' ],
				[ 'city', 'City' ],
				[ 'postalCode', 'Postal Code' ],
				[ 'region', 'Region' ],
				[ 'country', 'Country' ],
				[ 'phone', 'Phone' ],
				[ 'fax', 'Fax' ]
			],
			benchmark: true,
			logging: (...data) => {
				searchQuery = data
			}
		})
		if (!customer) {
			return 'No customer found'
		}
		const searchData = combineSearchData(searchQuery, 1)

		return { customer, searchData }
	}
}

export default new CustomerService()
