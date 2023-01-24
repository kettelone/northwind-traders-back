import { DataTypes } from 'sequelize' // с помощью DataTypes описываются типы поля(String, Int,  Array ect.)
import sequelize from '../db'
import {
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
} from './interfaces'
//Supplier
const Supplier = sequelize.define<SupplierInstance>('supplier', {
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

//Category
const Category = sequelize.define<CategoryInstance>('category', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	categoryName: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false }
})

// Product
const Product = sequelize.define<ProductInstance>('product', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	productName: { type: DataTypes.STRING, allowNull: true },
	quantityPerUnit: { type: DataTypes.STRING, allowNull: true },
	unitPrice: { type: DataTypes.FLOAT, allowNull: true },
	unitsInStock: { type: DataTypes.INTEGER, allowNull: true },
	unitsOnOrder: { type: DataTypes.INTEGER, allowNull: true },
	reorderLevel: { type: DataTypes.INTEGER, allowNull: true },
	discontinued: { type: DataTypes.INTEGER, allowNull: true }
})

//Order
const Order = sequelize.define<OrderInstance>('order', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	orderDate: { type: DataTypes.DATE, allowNull: true },
	requiredDate: { type: DataTypes.DATE, allowNull: true },
	shippedDate: { type: DataTypes.DATE, allowNull: true },
	shipVia: { type: DataTypes.INTEGER, allowNull: true },
	freight: { type: DataTypes.FLOAT, allowNull: true },
	shipName: { type: DataTypes.STRING, allowNull: true },
	shipAddress: { type: DataTypes.STRING, allowNull: true },
	shipCity: { type: DataTypes.STRING, allowNull: true },
	shipRegion: { type: DataTypes.STRING, allowNull: true },
	shipPostalCode: { type: DataTypes.STRING, allowNull: true },
	shipCountry: { type: DataTypes.STRING, allowNull: true }
})

//OrderDetail
const OrderDetail = sequelize.define<OrderDetailInstance>('orderDetail', {
	orderId: { type: DataTypes.INTEGER, allowNull: false },
	productId: { type: DataTypes.INTEGER, allowNull: false },
	unitPrice: { type: DataTypes.FLOAT, allowNull: true },
	quantity: { type: DataTypes.INTEGER, allowNull: true },
	discount: { type: DataTypes.FLOAT, allowNull: true }
})

// Customer
const Customer = sequelize.define<CustomerInstance>('customer', {
	id: {
		type: DataTypes.STRING,
		primaryKey: true
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
	fax: { type: DataTypes.STRING, allowNull: true }
})

// Employee
const Employee = sequelize.define<EmployeeInstance>('employee', {
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

// Regions
const Region = sequelize.define<RegionInstance>('region', {
	id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: true },
	regionDescription: { type: DataTypes.STRING, allowNull: true }
})

//Territories
const Territory = sequelize.define<TerritoryInstance>('territory', {
	id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: true },
	territoryDescription: { type: DataTypes.STRING, allowNull: true }
})

// Shippers
const Shipper = sequelize.define<ShipperInstance>('shipper', {
	id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: true },
	companyName: { type: DataTypes.STRING, allowNull: true },
	phone: { type: DataTypes.STRING, allowNull: true }
})

//DB queries
const DBQuerie = sequelize.define('dbqueris', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: new Date()
	},
	queryTime: { type: DataTypes.FLOAT, allowNull: false },
	queryBody: { type: DataTypes.TEXT, allowNull: false }
})

//Supplier & Product
Supplier.hasMany(Product)
Product.belongsTo(Supplier)

//Product & Category
Category.hasMany(Product)
Product.belongsTo(Category)

//Customer & Order
Customer.hasMany(Order)
Order.belongsTo(Customer)

//Employee & Order
Employee.hasMany(Order)
Order.belongsTo(Employee)

//Order & Product
Order.belongsToMany(Product, { through: OrderDetail })
Product.belongsToMany(Order, { through: OrderDetail })

//Employee & Territory
Employee.belongsToMany(Territory, { through: 'employeeTerritory' })
Territory.belongsToMany(Employee, { through: 'employeeTerritory' })

//Territory & Region
Territory.belongsTo(Region)
Region.hasMany(Territory)

export {
	Supplier,
	Product,
	Order,
	OrderDetail,
	Customer,
	Employee,
	Shipper,
	DBQuerie
}
