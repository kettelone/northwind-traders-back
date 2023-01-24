import { Supplier } from '../../models/model'

class SupplierService {
	async getAll(page: string, limit: string) {
		const finalPage = +page || 1
		const finalLimit = +limit || 20
		const offset = finalPage * finalLimit - finalLimit

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
			]
		})

		if (!suppliers) {
			return 'No suppliers found'
		}

		return suppliers
	}

	async getOne(id: number) {
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
			]
		})
		if (!supplier) {
			return 'Supplier was not found'
		}
		return supplier
	}
}

export default new SupplierService()
