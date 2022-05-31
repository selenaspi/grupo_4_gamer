// const path = require("path");

// const { DataTypes } = require("sequelize/types");

// const fs = require('fs');

// const Product = {
// 	fileName: path.join(__dirname, '../products.json'),

// 	getData: function () {
// 		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
// 	},

//     findAll: function () {
//         return this.getData();
//     },

//     findActiveProducts: function() {
//         let allProducts = this.findAll();
//         let allActiveProducts = allProducts.filter(product => product.alta);
//         return allActiveProducts;
//     },

// 	generateId: function () {
// 		let allProducts = this.findAll();
// 		let lastProduct = allProducts.pop();
// 		if (lastProduct) {
// 			return lastProduct.id + 1;
// 		}
// 		return 1;
// 	},

// 	findByPk: function (id) {
// 		let allProducts = this.findAll();
// 		let productFound = allProducts.find(oneProduct => oneProduct.id === id);
// 		return productFound;
// 	},

// 	findByField: function (field, text) {
// 		let allProducts = this.findAll();
// 		let productFound = allProducts.find(oneUser => oneUser[field] === text);
// 		return productFound;
// 	},

//     filterActivesByField: function(field, text) {
// 		let allActives = this.findActiveProducts();
//         let productsFound = allActives.filter(product => product[field] == text);
//         return productsFound;
//     },

// 	create: function (productData) {
// 		let allProducts = this.findAll();
// 		let newProduct = {
// 			id: this.generateId(),
// 			...productData
// 		}
// 		allProducts.push(newProduct);
// 		fs.writeFileSync(this.fileName, JSON.stringify(allProducts, null,  ' '));
// 		return newProduct;
// 	},

// 	delete: function (id) {
// 		let allProducts = this.findAll();
//         let newAllProducts = allProducts.map(product => {
//             if(product.id === id) {
//                 product = {
//                     ...product,
//                     alta: false
//                 }
//             }
//             return product;
//         })

// 		fs.writeFileSync(this.fileName, JSON.stringify(newAllProducts, null, ' '));
// 		return true;
// 	},

//     edition: function(productEdited) {
//         let allProducts = this.findAll();
//         let newAllProducts = allProducts.map(product => {
//             if(product.id === productEdited.id) {
//                 product = {
//                     ...productEdited
//                 }
//             }
//             return product;
//         });

//         fs.writeFileSync(this.fileName, JSON.stringify(newAllProducts, null, ' '));
// 		return true;
//     }
// }

// module.exports = Product;

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
	}

	return Product;
}