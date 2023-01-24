import { Optional, Model } from 'sequelize'

//Supplier
interface SupplierAttributes {
	id: number
	companyName: string
	contactName: string
	contactTitle: string
	address: string
	city: string
	region: string
	postalCode: string
	country: string
	phone: string
	fax: string
	homePage: string
	supplierName?: string
}

interface SupplierCreationAttributes extends SupplierAttributes {}
interface SupplierInstance
	extends Model<SupplierAttributes, SupplierCreationAttributes>,
		SupplierAttributes {}

//Category
interface CategoryAttributes {
	id: number
	categoryName: string
	description: string
}

interface CategoryCreationAttributes extends CategoryAttributes {}
interface CategoryInstance
	extends Model<CategoryAttributes, CategoryCreationAttributes>,
		CategoryAttributes {}

//Product
interface ProductAttributes {
	id: number
	productName: string
	quantityPerUnit: string
	unitPrice: number
	unitsInStock: number
	unitsOnOrder: number
	reorderLevel: number
	discontinued: number
	supplierId?: number
	categoryId?: number
	supplierName?: string
}

interface ProductCreationAttributes
	extends Optional<
			ProductAttributes,
			'supplierId' | 'categoryId' | 'supplierName'
		> {}
interface ProductInstance
	extends Model<ProductAttributes, ProductCreationAttributes>,
		ProductAttributes {}

//Order
interface OrderAttributes {
	id: number
	orderDate: Date
	requiredDate: Date
	shippedDate: Date
	shipVia: number
	freight: number
	shipName: string
	shipAddress: string
	shipCity: string
	shipRegion: string
	shipPostalCode: string
	shipCountry: string
	customerId?: number
	employeeId?: number
}

interface OrderCreationAttributes
	extends Optional<OrderAttributes, 'customerId' | 'employeeId'> {}
interface OrderInstance
	extends Model<OrderAttributes, OrderCreationAttributes>,
		OrderAttributes {}

//OrderDetail
interface OrderDetailAttributes {
	orderId: number
	productId: number
	unitPrice: number
	quantity: number
	discount: number
}

interface OrderDetailCreationAttributes extends OrderDetailAttributes {}
interface OrderDetailInstance
	extends Model<OrderDetailAttributes, OrderDetailCreationAttributes>,
		OrderDetailAttributes {}

//Customer
interface CustomerAttributes {
	id: string
	companyName: string
	contactName: string
	contactTitle: string
	address: string
	city: string
	region: string
	postalCode: string
	country: string
	phone: string
	fax: string
}

interface CustomerCreationAttributes extends CustomerAttributes {}
interface CustomerInstance
	extends Model<CustomerAttributes, CustomerCreationAttributes>,
		CustomerAttributes {}

//Employee
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
interface EmployeeInstance
	extends Model<EmployeeAttributes, EmployeeCreationAttributes>,
		EmployeeAttributes {}

//Region
interface RegionAttributes {
	id: number
	regionDescription: string
}

interface RegionCreationAttributes extends RegionAttributes {}
interface RegionInstance
	extends Model<RegionAttributes, RegionCreationAttributes>,
		RegionAttributes {}

//Territory
interface TerritoryAttributes {
	id: number
	territoryDescription: string
	regionId?: number
}

interface TerritoryCreationAttributes extends TerritoryAttributes {}
interface TerritoryInstance
	extends Model<TerritoryAttributes, TerritoryCreationAttributes>,
		TerritoryAttributes {}

//Shipper
interface ShipperAttributes {
	id: number
	companyName: string
	phone: string
}

interface ShipperCreationAttributes extends ShipperAttributes {}
interface ShipperInstance
	extends Model<ShipperAttributes, ShipperCreationAttributes>,
		ShipperAttributes {}

export {
	SupplierInstance,
	CategoryInstance,
	ProductInstance,
	OrderInstance,
	OrderDetailInstance,
	CustomerInstance,
	EmployeeInstance,
	RegionInstance,
	TerritoryInstance,
	ShipperInstance
}
