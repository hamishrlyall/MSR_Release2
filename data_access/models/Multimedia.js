/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Multimedia', {
		MultimediaId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		source: {
			type: DataTypes.STRING,
			allowNull: true
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true
		},
		altText: {
			type: DataTypes.STRING,
			allowNull: true
		},
		MediaTypeId: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: 'MediaType',
				key: 'MediaTypeId'
			}
		}
	}, {
		tableName: 'Multimedia',
		timestamps: false,
		freezeTableName: true
	});
};
