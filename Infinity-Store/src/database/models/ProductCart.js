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
		closed_at : {
			type : DataTypes.DATE,
			defaultValue : null
		},
		alta : {
			type : DataTypes.TINYINT(1),
			allowNull : false,
			defaultValue : 1
		}
	}

	let config = {
		tableName : "product_carts",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "closed_at"
	}

	const ProductCart = sequelize.define("ProductCart", cols, config)

	ProductCart.associate = function(models) {
		ProductCart.belongsTo(models.User, {
			as: "user",
			foreignKey: "user_id"
		})

		ProductCart.hasMany(models.ProductCartProduct, {
			as: "joinProductCartProduct",
			foreignKey: "product_cart_id"
		})

		ProductCart.belongsToMany(models.Product, {
			as: "products",
			through: "product_carts_products",
			foreignKey: "product_cart_id",
			otherKey: "product_id",
			timestamps: true
		})

	}

	return ProductCart;
}