/* =======================
    LOAD THE DEPENDENCIES
==========================*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const syncDatabase = require('./bin/sync-db');
/* =======================
    LOAD THE CONFIG
==========================*/
const config = require('./config');
const port = process.env.PORT || 3000

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express()


// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// print the request log on console
app.use(morgan('dev'))

// set the secret key variable for jwt
app.set('jwt-secret', config.secret)

// index page, just for testing
app.get('/', (req, res) => {
    res.send('Hello JWT')
})
// configure api router
app.use('/api', require('./routes/api'))
// open the server
app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})
/* =======================
    DB SEQUELIZE CONFIGURATION
==========================*/
const sequelize = new Sequelize(config.database, config.user, config.password, {
	host: 'localhost',
	dialect: 'mysql',

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});
sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});
	module.exports = {
		sequelize: sequelize
	}
// syncDatabase().then(() => {
// 	console.log('Database sync');
// });
