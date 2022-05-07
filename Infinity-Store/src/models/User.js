const path = require("path");

const fs = require('fs');

const User = {
	fileName: path.join(__dirname, '../database/users.json'),

	getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},

	generateId: function () {
		let allUsers = this.findAll();
		let lastUser = allUsers.pop();
		if (lastUser) {
			return lastUser.id + 1;
		}
		return 1;
	},

	findAll: function () {
		return this.getData();
	},

	findByPk: function (id) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser.id === id);
		return userFound;
	},

	findByField: function (field, text) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser[field] === text);
		return userFound;
	},

	create: function (userData) {
		let allUsers = this.findAll();
		let newUser = {
			id: this.generateId(),
			...userData
		}
		allUsers.push(newUser);
		fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null,  ' '));
		return newUser;
	},

	delete: function (id) {
		let allUsers = this.findAll();
        let newAllUsers = allUsers.map(user => {
            if(user.id === id) {
                user = {
                    ...user,
                    alta: false
                }
            }
            return user;
        })

		fs.writeFileSync(this.fileName, JSON.stringify(newAllUsers, null, ' '));
		return true;
	},

    edition: function(userEdited) {
        let allUsers = this.findAll();
        let newAllUsers = allUsers.map(user => {
            if(user.id === userEdited.id) {
                user = {
                    ...userEdited
                }
            }
            return user;
        });

        fs.writeFileSync(this.fileName, JSON.stringify(newAllUsers, null, ' '));
		return true;
    }
}

module.exports = User;