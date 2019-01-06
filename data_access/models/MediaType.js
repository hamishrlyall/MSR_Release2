/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('MediaType', {
		MediaTypeId: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'MediaType',
		timestamps: false,
		freezeTableName: true
	});
};
