import { Model } from 'sequelize'

interface RegionAttributes {
	id: number
	regionDescription: string
}

interface RegionCreationAttributes extends RegionAttributes {}
export interface RegionInstance
	extends Model<RegionAttributes, RegionCreationAttributes>,
		RegionAttributes {}
