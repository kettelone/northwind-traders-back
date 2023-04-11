import { Order, Shipper, OrderDetail, Product } from '../models/relations'
const { col, fn } = Order.sequelize!

class OrderService {
	async findOrders(page: string, limit: string) {
		const finalPage = +page || 1
		const finalLimit = +limit || 20
		const offset = finalPage * finalLimit - finalLimit

		const orders = await Order.findAndCountAll({
			limit: finalLimit,
			offset,
			attributes: [
				'id',
				[ fn('to_char', col('shippedDate'), 'YYYY-MM-DD'), 'shippedDate' ],
				'shipName',
				'shipCity',
				'shipCountry'
			]
		})

		const ordersId = orders.rows.map((order) => order.id)

		//get all orders details for all queried orders
		const orderDetails = await OrderDetail.findAll({
			where: { orderId: ordersId }
		})

		const ordersTotal: {
			[key: string]: {
				totalQuantity: number
				totalPrice: number
				productId: number
				totalProducts: number
			}
		} = {}

		//calculate orders total info(totalQuantity,totalPrice,totalProducts)
		orderDetails.map((orderDetail) => {
			const { quantity, unitPrice, productId } = orderDetail
			const orderId = orderDetail.orderId.toString()
			if (!ordersTotal.hasOwnProperty(orderId)) {
				ordersTotal[orderId] = {
					totalQuantity: quantity,
					totalPrice: unitPrice * quantity,
					totalProducts: 1,
					productId: productId
				}
			} else {
				ordersTotal[orderId].totalQuantity += quantity
				ordersTotal[orderId].totalPrice += unitPrice * quantity
				ordersTotal[orderId].totalProducts =
					ordersTotal[orderId].productId === productId
						? ordersTotal[orderId].totalProducts
						: ordersTotal[orderId].totalProducts + 1
			}
		})

		//create final object combining initial "orders" object and "ordersTotal" object
		const finalInfo = orders.rows.map((order) => {
			const id = order.id.toString()
			const newOrder = {
				...order.dataValues,
				...{
					totalPrice: ordersTotal[id].totalPrice.toFixed(2),
					totalProducts: ordersTotal[id].totalProducts,
					totalQuantity: ordersTotal[id].totalQuantity
				}
			}
			return newOrder
		})
		return { orders: finalInfo, count: orders.count }
	}

	async findOne(id: number) {
		const order = await Order.findOne({
			where: { id },
			attributes: [
				'id',
				[ fn('to_char', col('orderDate'), 'YYYY-MM-DD'), 'orderDate' ],
				[ fn('to_char', col('requiredDate'), 'YYYY-MM-DD'), 'requiredDate' ],
				[ fn('to_char', col('shippedDate'), 'YYYY-MM-DD'), 'shippedDate' ],
				'shipVia',
				'freight',
				'shipName',
				'shipAddress',
				'shipCity',
				'shipRegion',
				'shipPostalCode',
				'shipCountry'
			]
		})

		if (!order) {
			return 'Order was not found'
		}
		const shipVia = await Shipper.findOne({ where: { id: order.shipVia } })
		const orderProducts = await OrderDetail.findAll({
			where: { orderId: order.id }
		})

		if (!orderProducts) {
			return 'There is no items ordered'
		}

		const totalProducts = orderProducts.length
		const totalQuantity = orderProducts.reduce(
			(acc, product) => product.quantity + acc,
			0
		)
		const totalPrice = orderProducts.reduce(
			(acc, product) => product.unitPrice * product.quantity + acc,
			0
		)
		const totalDiscount = orderProducts.reduce(
			(acc, product) => product.discount + acc,
			0
		)
		const productIds = orderProducts.map((product) => product.productId)
		const products = await Product.findAll({ where: { id: productIds } })

		interface ProductsInfo {
			productName: string
			productId: number
			quantity: number
			unitPrice: number
			totalPrice: number
			discount: number
		}
		const productsInfo: ProductsInfo[] = []

		orderProducts.map((orderProduct) => {
			products.map((product) => {
				if (product.id === orderProduct.productId) {
					productsInfo.push({
						productName: product.productName,
						productId: orderProduct.productId,
						quantity: orderProduct.quantity,
						unitPrice: orderProduct.unitPrice,
						totalPrice: orderProduct.quantity * orderProduct.unitPrice,
						discount: orderProduct.discount
					})
				}
			})
		})
		const finalOrderInfo = {
			...{
				'Customer Id': order.dataValues.customerId,
				'Ship Name': order.dataValues.shipName
			},
			...{
				'Total Products': totalProducts,
				'Total Quantity': totalQuantity,
				'Total Price': totalPrice,
				'Total Discount': totalDiscount,
				'Ship Via': shipVia === null ? null : shipVia.companyName
			},
			...{
				Freight: order.dataValues.freight,
				'Order Date': order.dataValues.orderDate,
				'Required Date': order.dataValues.requiredDate,
				'Shipped Date': order.dataValues.shippedDate,
				'Ship City': order.dataValues.shipCity,
				'Ship Region': order.dataValues.shipRegion,
				'Ship Postal Code': order.dataValues.shipPostalCode,
				'Ship Country': order.dataValues.shipCountry
			},
			productsInOrder: productsInfo
		}

		return finalOrderInfo
	}
}
export default new OrderService()
