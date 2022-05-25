const path = require("path");

const fs = require('fs');

const ProductCartTransaction = {

	fileName: path.join(__dirname, '../product_cart_Transaction.json'),

	getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},

    findAll: function () {
        return this.getData();
    },

    findActiveTransaction: function() {
        let allTransaction = this.findAll();
        let allActiveTransaction = allTransaction.filter(transaction => transaction.alta);
        return allActiveTransaction;
    },

	generateId: function () {
		let allTransaction = this.findAll();
		let lastTransaction = allTransaction.pop();
		if (lastTransaction) {
			return lastTransaction.id + 1;
		}
		return 1;
	},

	findByPk: function (id) {
		let allTransaction = this.findAll();
		let transactionFound = allTransaction.find(oneTransaction => oneTransaction.id === id);
		return transactionFound;
	},

	findByField: function (field, text) {
		let allTransaction = this.findAll();
		let transactionFound = allTransaction.find(oneTransaction => oneTransaction[field] === text);
		return transactionFound;
	},

    filterActivesByField: function(field, text) {
		let allActives = this.findActiveTransaction();
        let transactionFound = allActives.filter(transaction => transaction[field] == text);
        return transactionFound;
    },

	create: function (transactionData) {
		let allTransaction = this.findAll();
		let newTransaction = {
			id: this.generateId(),
			...transactionData
		}
		allTransaction.push(newTransaction);
		fs.writeFileSync(this.fileName, JSON.stringify(allTransaction, null,  ' '));
		return newTransaction;
	},

	delete: function (id) {
		let allTransaction = this.findAll();
        let newAllTransaction = allTransaction.map(transaction => {
            if(transaction.id === id) {
                transaction = {
                    ...transaction,
                    alta: false
                }
            }
            return transaction;
        })

		fs.writeFileSync(this.fileName, JSON.stringify(newAllTransaction, null, ' '));
		return true;
	},

    edition: function(transactionEdited) {
        let allTransaction = this.findAll();
        let newAllTransaction = allTransaction.map(transaction => {
            if(transaction.id === transactionEdited.id) {
                transaction = {
                    ...transactionEdited
                }
            }
            return transaction;
        });

        fs.writeFileSync(this.fileName, JSON.stringify(newAllTransaction, null, ' '));
		return true;
    }
}

module.exports = ProductCartTransaction;