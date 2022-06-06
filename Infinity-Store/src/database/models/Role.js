module.exports = function (sequelize, dataTypes) {
	let alias = "Role"; //Apodo de como le voy a decir a esta tabla//

	//colunmas de la tabla de users de mi base de datos//
	let cols = {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull : false, 

		},
		name: {
			type: dataTypes.STRING(10),
			allowNull : false, 
		}
	}

	let config = {
		tableName: "roles",
		timestamps: false,
	}
	const Role = sequelize.define(alias, cols, config)

	Role.associate = function (models) { // como se relaciona Role con usuario
		Role.hasMany(models.User, {
			as: "users",
			foreignKey: "role_id"
		})
	}

	return Role;
}