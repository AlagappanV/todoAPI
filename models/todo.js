module.exports = function(sequelize, DataTypes) {
	return sequelize.define('todo', {
		description: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			len: [1, 250]
		}
	},
	status: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});
	
};