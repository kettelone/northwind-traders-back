import { Customer } from '../../models/model'

class CustomerService {
	async getAll(page: string, limit: string) {
		const finalPage = +page || 1
		const finalLimit = +limit || 20
		const offset = finalPage * finalLimit - finalLimit

		const customers = await Customer.findAndCountAll({
			limit: finalLimit,
			offset,
			attributes: {
				exclude: [ 'address', 'region', 'postalCode', 'phone', 'fax' ]
			}
		})
		if (!customers) {
			return 'No customers found'
		}

		return customers
	}

	async getOne(id: number) {
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
			]
		})
		if (!customer) {
			return 'No customer found'
		}
		return customer
	}
}

export default new CustomerService()
