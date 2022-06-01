module.exports = function(sequelize, dataTypes) {
	let alias = "User"; //Apodo de como le voy a decir a esta tabla//
	
	//colunmas de la tabla de users de mi base de datos//
	let cols = 
	{
		id:{
				type:dataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true, 
		},
		name:{
			type:dataTypes.STRING(100)
		},
		last_name: {
			type:dataTypes.STRING(100)
		},
		email:{
			type:dataTypes.STRING(200)
		} ,
		password:{
			type:dataTypes.TEXT
		} ,
		phone:{
			type:dataTypes.BIGINT(20)
		} ,
		image: {
			type:dataTypes.TEXT
		}, 
		alta:{
			type:dataTypes.TINYINT(1)
		} ,
		date_of_birth:{ 
			type:dataTypes.DATE
		} , 
		home_adress:{ 
			type:dataTypes.TEXT
		},
		role_id:{ 
			type:dataTypes.INTEGER,
		} ,
	}
	
	let config = {
		tableName:"users",
		timestamps:false,
	}
	let User = sequelize.define(alias, cols, config);
	
	User.associate = function(models){ // como se relaciona usuarios con roles
		User.belongsTo(models.roles,{
			as:"roles",
			foreignKey:"role_id"
		})
	}
	return User;
}
