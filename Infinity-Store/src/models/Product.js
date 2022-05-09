const path = require("path");

const fs = require('fs');

const Product = {
	fileName: path.join(__dirname, '../database/products.json'),

	getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},

    findAll: function () {
        return this.getData();
    },

    findActiveProducts: function() {
        let allProducts = this.findAll();
        let allActiveProducts = allProducts.filter(product => product.alta);
        return allActiveProducts;
    },

	generateId: function () {
		let allProducts = this.findAll();
		let lastProduct = allProducts.pop();
		if (lastProduct) {
			return lastProduct.id + 1;
		}
		return 1;
	},

	findByPk: function (id) {
		let allProducts = this.findAll();
		let productFound = allProducts.find(oneProduct => oneProduct.id === id);
		return productFound;
	},

	findByField: function (field, text) {
		let allProducts = this.findAll();
		let productFound = allProducts.find(oneUser => oneUser[field] === text);
		return productFound;
	},

    filterActivesByField: function(field, text) {
		let allActives = this.findActiveProducts();
        let productsFound = allActives.filter(product => product[field] == text);
        return productsFound;
    },

	create: function (productData) {
		let allProducts = this.findAll();
		let newProduct = {
			id: this.generateId(),
			...productData
		}
		allProducts.push(newProduct);
		fs.writeFileSync(this.fileName, JSON.stringify(allProducts, null,  ' '));
		return newProduct;
	},

	delete: function (id) {
		let allProducts = this.findAll();
        let newAllProducts = allProducts.map(product => {
            if(product.id === id) {
                product = {
                    ...product,
                    alta: false
                }
            }
            return product;
        })

		fs.writeFileSync(this.fileName, JSON.stringify(newAllProducts, null, ' '));
		return true;
	},

    edition: function(productEdited) {
        let allProducts = this.findAll();
        let newAllProducts = allProducts.map(product => {
            if(product.id === productEdited.id) {
                product = {
                    ...productEdited
                }
            }
            return product;
        });

        fs.writeFileSync(this.fileName, JSON.stringify(newAllProducts, null, ' '));
		return true;
    }
}

module.exports = Product;