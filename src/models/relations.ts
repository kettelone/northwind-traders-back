import { Supplier } from './supplier/Supplier'
import { Category } from './category/Category'
import { Product } from './product/Product'
import { Order } from './order/Order'
import { OrderDetail } from './orderDetails/OrderDetails'
import { Customer } from './customer/Customer'
import { Employee } from './employee/Employee'
import { Region } from './region/Region'
import { Territory } from './territory/Territory'
import { Shipper } from './shipper/Shipper'

// const DBQuerie = sequelize.define('dbqueris', {
// 	id: {
// 		type: DataTypes.UUID,
// 		primaryKey: true,
// 		allowNull: false,
// 		defaultValue: DataTypes.UUIDV4
// 	},
// 	date: {
// 		type: DataTypes.DATE,
// 		allowNull: false,
// 		defaultValue: new Date()
// 	},
// 	queryTime: { type: DataTypes.FLOAT, allowNull: false },
// 	queryBody: { type: DataTypes.TEXT, allowNull: false }
// })

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

//Order & OrderDetails
Order.hasMany(OrderDetail)
OrderDetail.belongsTo(Order)

//Employee & Territory
Employee.belongsToMany(Territory, { through: 'employeeTerritory' })
Territory.belongsToMany(Employee, { through: 'employeeTerritory' })

//Territory & Region
Territory.belongsTo(Region)
Region.hasMany(Territory)

export { Supplier, Product, Order, OrderDetail, Customer, Employee, Shipper }
