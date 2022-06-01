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
		alta : {
			type : DataTypes.TINYINT(1),
			allowNull : false,
			defaultValue : 1
		}
	}

	let config = {
		tableName : "product_carts_products",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at"
	}

	const ProductCartProduct = sequelize.define("ProductCartProduct", cols, config)

	ProductCartProduct.associate = function(models) {
		ProductCartProduct.belongsTo(models.Product, {
			as: "product",
			foreignKey: "product_id"
		})
		
		ProductCartProduct.belongsTo(models.ProductCart, {
			as: "productCart",
			foreignKey: "product_cart_id"
		})
	}

	return ProductCartProduct;
}