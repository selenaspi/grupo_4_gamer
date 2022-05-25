const path = require("path");

const fs = require('fs');

const Product = {

	fileName: path.join(__dirname, '../product_cart.json'),

	getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},

    findAll: function () {
        return this.getData();
    },

    findActiveProductCarts: function() {
        let allProductCarts = this.findAll();
        let allActiveProductCarts = allProductCarts.filter(productCart => productCart.alta);
        return allActiveProductCarts;
    },

	generateId: function () {
		let allProductCarts = this.findAll();
		let lastProductCart = allProductCarts.pop();
		if (lastProductCart) {
			return lastProductCart.id + 1;
		}
		return 1;
	},

	findByPk: function (id) {
		let allProductCarts = this.findAll();
		let productCartFound = allProductCarts.find(oneProductCart => oneProductCart.id === id);
		return productCartFound;
	},

	findByField: function (field, text) {
		let allProductCarts = this.findAll();
		let productCartFound = allProductCarts.find(oneProductCart => oneProductCart[field] === text);
		return productCartFound;
	},

    filterActivesByField: function(field, text) {
		let allActivesProductCarts = this.findActiveProductCarts();
        let productCartsFound = allActivesProductCarts.filter(product => product[field] == text);
        return productCartsFound;
    },

	create: function (productCartData) {
		let allProductCarts = this.findAll();
		let newProductCart = {
			id: this.generateId(),
			...productCartData
		}
		allProductCarts.push(newProductCart);
		fs.writeFileSync(this.fileName, JSON.stringify(allProductCarts, null,  ' '));
		return newProductCart;
	},

	delete: function (id) {
		let allProductCarts = this.findAll();
        let newAllProductCarts = allProductCarts.map(productCart => {
            if(productCart.id === id) {
                productCart = {
                    ...productCart,
                    alta: false
                }
            }
            return productCart;
        })

		fs.writeFileSync(this.fileName, JSON.stringify(newAllProductCarts, null, ' '));
		return true;
	},

    edition: function(productCartEdited) {
        let allProductCarts = this.findAll();
        let newAllProductCarts = allProductCarts.map(productCart => {
            if(productCart.id === productCartEdited.id) {
                productCart = {
                    ...productCartEdited
                }
            }
            return productCart;
        });

        fs.writeFileSync(this.fileName, JSON.stringify(newAllProductCarts, null, ' '));
		return true;
    }
}

module.exports = Product;