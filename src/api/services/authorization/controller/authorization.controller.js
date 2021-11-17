const jwtSecret = require('../../common/config/env.config.js').jwt_secret, jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.login = (req, res) => {
    try {
        let salt = crypto.randomBytes(16).toString('base64');
        req.body.refreshKey = salt;
        console.log(req.body);
        let token = jwt.sign(req.body, jwtSecret);        
        res.status(200).send({accessToken: token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};