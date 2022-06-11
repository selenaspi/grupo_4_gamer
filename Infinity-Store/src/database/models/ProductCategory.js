module.exports = (sequelize, DataTypes) => {
	
	let cols = {
		
		id : {
			type : DataTypes.INTEGER(10),
			autoIncrement : true,
			allowNull : false, 
			primaryKey : true, 
			unique : true
		}, 
		name : {
			type: DataTypes.STRING(100),
			allowNull : false
		},
		image : {
			type : DataTypes.TEXT, //Habrá que ver si se puede incorporar una tabla con las fotos
			allowNull : false
		}
	}

	let config = {
		tableName : "product_categories",
		charset: 'utf8',
		collate: 'utf8_unicode_ci', 
		timestamps : false
	}

	const ProductCategory = sequelize.define("ProductCategory", cols, config)

	ProductCategory.associate = function(models) {
		ProductCategory.hasMany(models.Product, {
			as: "products",
			foreignKey: "product_category_id"
		})
	}

	return ProductCategory;
}