/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('data', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		fname: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		lname: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		dept: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		degree: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		year: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		hall: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		home_city: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		home_province: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		home_country: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		home_zipcode: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		company: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		position: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		biz_city: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		biz_province: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		biz_country: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		biz_zipcode: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		linkedin: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'data',
		timestamps: false
	});
};
