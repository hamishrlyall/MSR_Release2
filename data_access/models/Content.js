/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Content', {
		ContentId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		SlideId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Slide',
				key: 'SlideId'
			}
		},
		heading: {
			type: DataTypes.STRING,
			allowNull: true
		},
		text: {
			type: DataTypes.STRING,
			allowNull: true
		},
		orderNumber: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		reference: {
			type: DataTypes.STRING,
			allowNull: true
		},
		multimediaId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'Multimedia',
				key: 'MultimediaId'
			}
		}
	}, {
		tableName: 'Content',
		timestamps: false,
		freezeTableName: true
	});
};
