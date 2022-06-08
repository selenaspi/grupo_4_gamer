module.exports = (sequelize, DataTypes) => {
	
	let cols = {
		
		id : {
			type : DataTypes.INTEGER(10),
			autoIncrement : true,
			allowNull : false, 
			primaryKey : true
		}, 
		created_at : {
			type : DataTypes.DATE,
			defaultValue : DataTypes.NOW,
			allowNull : false
		}, 
		updated_at : {
			type : DataTypes.DATE,
			defaultValue : null
		},
		name : {
			type: DataTypes.TEXT,
			allowNull : false
		},
		description : {
			type : DataTypes.TEXT, 
			defaultValue : "Sin descripción"
		},
		image : {
			type : DataTypes.TEXT, //Habrá que ver si se puede incorporar una tabla con las fotos
			allowNull : false
		}, 
		price : {
			type : DataTypes.DECIMAL, 
			allowNull : false
		},
		off_sale : {
			type : DataTypes.TINYINT(1), 
			defaultValue : 0
		}, 
		discount : {
			type : DataTypes.TINYINT,
			defaultValue : null
		}, 
		stock : {
			type : DataTypes.INTEGER, 
			allowNull : false,
			defaultValue : 0
		},
		alta : {
			type : DataTypes.TINYINT(1),
			allowNull : false,
			defaultValue : 1
		}
	}

	let config = {
		tableName : "products",
		charset: 'utf8',
		collate: 'utf8_unicode_ci',
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at"
	}

	const Product = sequelize.define("Product", cols, config)

	Product.associate = function(models) {
		Product.belongsTo(models.ProductCategory, {
			as: "category",
			foreignKey: "product_category_id"
		})
		
		Product.hasMany(models.Opinion, {
			as: "opinions",
			foreignKey: "product_id"
		})

		Product.hasMany(models.ProductCartProduct, {
			as: "joinProductCartProduct",
			foreignKey: "product_id"
		})
		
		Product.belongsToMany(models.ProductCart, {
			as: "productCarts",
			through: "product_carts_products",
			foreignKey: "product_id",
			otherKey: "product_cart_id",
			timestamps: true
		})

	}

	return Product;
}