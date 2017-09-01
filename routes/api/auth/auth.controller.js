const jwt = require('jsonwebtoken')
const User = require('../../../models/user')
/*
    POST /api/auth/register
    {
        username,
        password
    }
*/
exports.register = (req, res) => {
	const { username, password } = req.body
  	if (!username.length) {
    	return res.status(400).json({error: 'Incorrenct name'});
  	}

  	User.create({
    	username: username,
		password: password
	}).then((user) => res.status(200).json(user))
};

exports.login = (req, res) => {
    const {username, password} = req.body
    const secret = req.app.get('jwt-secret')

	const respond = (token) => {
        res.json({
            message: 'logged in successfully',
            token
        })
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

		// user exists, check the password
  	User.findOne({
		where: {
			username: username,
			password: password
		}
	}).then(
		(user) => {
			if(!user) {
				return res.status(406).json('there is no such user');
			} else {
				const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: user._id,
                            username: user.username,
                            admin: user.admin
                        },
                        secret,
                        {
                            expiresIn: '7d',
                            issuer: 'velopert.com',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err)
                            resolve(token)
                        })
                }).then(respond)
			    .catch(onError);
			}
		}
	)
}

exports.check = (req, res) => {
	res.json({
        success: true,
        info: req.decoded
    })
};
