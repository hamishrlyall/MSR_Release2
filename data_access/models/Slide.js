/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Slide', {
		SlideId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		longitude: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		latitude: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		location: {
			type: DataTypes.STRING,
			allowNull: true
		},
		heading: {
			type: DataTypes.STRING,
			allowNull: true
		},
		approved: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		dateStart: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		dateEnd: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		LifeStageId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'LifeStage',
				key: 'LifeStageId'
			}
		}
	}, {
		tableName: 'Slide',
		timestamps: false,
		freezeTableName: true
	});
};
