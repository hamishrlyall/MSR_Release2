/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('LifeStage', {
		LifeStageId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		PortfolioId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Portfolio',
				key: 'PortfolioId'
			}
		},
		heading: {
			type: DataTypes.STRING,
			allowNull: true
		},
		rgbValue: {
			type: DataTypes.CHAR,
			allowNull: true
		}
	}, {
		tableName: 'LifeStage',
		timestamps: false,
		freezeTableName: true
	});
};
