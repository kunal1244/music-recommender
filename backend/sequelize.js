const Sequelize = require('sequelize');
const model1 = require('./data');
const model2 = require('./locations');
const config = require(`./config.json`)['development'];

const sequelize = new Sequelize(
	config.database, config.username, config.password, {
		host : config.host,
		dialect : config.dialect,
		logging : false,
		timestamps : false
	}
);

const data = model1(sequelize, Sequelize);
const location = model2(sequelize, Sequelize);

module.exports = {
	sequelize,
	data,
	location
};