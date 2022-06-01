module.exports = function(sequelize, dataTypes) {
	let alias = "roles"; //Apodo de como le voy a decir a esta tabla//
	
	//colunmas de la tabla de users de mi base de datos//
	let cols = 
	{
		id:{
				type:dataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true, 
		},
		name:{
			type:dataTypes.STRING(10)
		}
	}
	
	let config = {
		tableName:"roles",
		timestamps:false,
	}
	let roles = sequelize.define(alias, cols, config)

	roles.associate = function(models){ // como se relaciona roles con usuario
		roles.belongsTo(models.User,{
			as:"User",
			foreignKey:"id"
		})
	}

    return roles;
}