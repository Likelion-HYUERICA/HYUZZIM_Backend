const Sequelize = require('sequelize');
const sequelize = require('../bin/sequelize');

const User = sequelize.define('user', {
	username: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	}
});

module.exports = User;
