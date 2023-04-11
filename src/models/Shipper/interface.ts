import { Model } from 'sequelize'

interface ShipperAttributes {
	id: number
	companyName: string
	phone: string
}

interface ShipperCreationAttributes extends ShipperAttributes {}
export interface ShipperInstance
	extends Model<ShipperAttributes, ShipperCreationAttributes>,
		ShipperAttributes {}
