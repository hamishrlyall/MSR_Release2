/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Portfolio', {
		PortfolioId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		otherName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		alias: {
			type: DataTypes.STRING,
			allowNull: true
		},
		dateOfBirth: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		dateOfDeath: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		enlistedDate: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		regimentNo: {
			type: DataTypes.STRING,
			allowNull: true
		},
		unit: {
			type: DataTypes.STRING,
			allowNull: true
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true
		},
		religion: {
			type: DataTypes.STRING,
			allowNull: true
		},
		maritalStatus: {
			type: DataTypes.STRING,
			allowNull: true
		},
		fate: {
			type: DataTypes.STRING,
			allowNull: true
		},
		nextOfKin: {
			type: DataTypes.STRING,
			allowNull: true
		},
		rollOfHonour: {
			type: DataTypes.STRING,
			allowNull: true
		},
		aifId: {
			type: DataTypes.STRING,
			allowNull: true
		},
		obituary: {
			type: DataTypes.STRING,
			allowNull: true
		},
		occupation: {
			type: DataTypes.STRING,
			allowNull: true
		},
		creditedStudent: {
			type: DataTypes.STRING,
			allowNull: true
		},
		MultimediaId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Multimedia',
				key: 'MultimediaId'
			}
		}
	}, {
		tableName: 'Portfolio',
		timestamps: false,
		freezeTableName: true
	});
};
