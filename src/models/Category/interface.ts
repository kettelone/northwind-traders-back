import { Model } from 'sequelize'

interface CategoryAttributes {
	id: number
	categoryName: string
	description: string
}

interface CategoryCreationAttributes extends CategoryAttributes {}
export interface CategoryInstance
	extends Model<CategoryAttributes, CategoryCreationAttributes>,
		CategoryAttributes {}
