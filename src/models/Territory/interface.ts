import { Model } from 'sequelize'

interface TerritoryAttributes {
	id: number
	territoryDescription: string
	regionId?: number
}

interface TerritoryCreationAttributes extends TerritoryAttributes {}
export interface TerritoryInstance
	extends Model<TerritoryAttributes, TerritoryCreationAttributes>,
		TerritoryAttributes {}
