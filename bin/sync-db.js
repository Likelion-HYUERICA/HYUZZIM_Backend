const User = require('../models/user')

module.exports = () => {
  return User.sequelize.sync({force: true})
}
