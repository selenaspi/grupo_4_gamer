module.exports = function (sequelize, dataTypes) {
	let alias = "User"; //Apodo de como le voy a decir a esta tabla//

	//colunmas de la tabla de users de mi base de datos//
	let cols =
	{
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		created_at: {
			type: dataTypes.DATE,
			defaultValue: dataTypes.NOW,
			allowNull: false
		},
		updated_at: {
			type: dataTypes.DATE,
			defaultValue: null
		},
		name: {
			type: dataTypes.STRING(100),
			allowNull : false
		},
		last_name: {
			type: dataTypes.STRING(100),
			allowNull : false
		},
		email: {
			type: dataTypes.STRING(200),
			allowNull : false, 
			unique : true
		},
		password: {
			type: dataTypes.TEXT,
			allowNull : false
		},
		phone: {
			type: dataTypes.BIGINT(),
			defaultValue: null
		},
		image: {
			type: dataTypes.TEXT,
			defaultValue: "avatar-generico.png"
		},
		alta: {
			type: dataTypes.TINYINT(1),
			defaultValue: 1,
			allowNull : false,
		},
		date_of_birth: {
			type: dataTypes.DATE,
			allowNull : false
		},
		home_adress: {
			type: dataTypes.TEXT,
			defaultValue: null
		}
	}

	let config = {
		tableName: "users",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at"
	}
	const User = sequelize.define(alias, cols, config);

	User.associate = function(models) { // como se relaciona usuarios con roles
		User.belongsTo(models.Role, {
			as: "role",
			foreignKey: "role_id"
		})
	}
	return User;
}
