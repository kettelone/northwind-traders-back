import { Supplier } from '../models/relations'
import combineSearchData from '../utils/utils'

class SupplierService {
	async getAll(page: string, limit: string) {
		const finalPage = +page || 1
		const finalLimit = +limit || 20
		const offset = finalPage * finalLimit - finalLimit
		let searchQuery: any = {}

		const suppliers = await Supplier.findAndCountAll({
			limit: finalLimit,
			offset,
			attributes: [
				'id',
				'companyName',
				'contactName',
				'contactTitle',
				'city',
				'country'
			],
			benchmark: true,
			logging: (...data) => {
				searchQuery = data
			}
		})

		if (!suppliers) {
			return 'No suppliers found'
		}

		const searchData = combineSearchData(searchQuery, suppliers.rows.length)

		return { suppliers, searchData }
	}

	async getOne(id: number) {
		let searchQuery: any = {}

		const supplier = await Supplier.findOne({
			where: { id },
			attributes: [
				[ 'companyName', 'Company Name' ],
				[ 'contactName', 'Contact Name' ],
				[ 'contactTitle', 'Contact Title' ],
				[ 'address', 'Address' ],
				[ 'city', 'City' ],
				[ 'region', 'Region' ],
				[ 'postalCode', 'Postal Code' ],
				[ 'country', 'Country' ],
				[ 'phone', 'Phone' ]
			],
			benchmark: true,
			logging: (...data) => {
				searchQuery = data
			}
		})
		if (!supplier) {
			return 'Supplier was not found'
		}
		const searchData = combineSearchData(searchQuery, 1)
		return { supplier, searchData }
	}
}

export default new SupplierService()
