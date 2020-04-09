const jwt = require('jsonwebtoken'),
    secret = require('../config/env.config.js').jwt_secret,
    crypto = require('crypto');

exports.verifyRefreshBodyField = (req, res, next) => {
    if (req.body && req.body.refresh_token) {
        return next();
    } else {
        return res.status(400).send({error: 'need to pass refresh_token field'});
    }
};

exports.validRefreshNeeded = (req, res, next) => {
    let b = new Buffer(req.body.refresh_token, 'base64');
    let refresh_token = b.toString();
    let hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + secret).digest("base64");
    if (hash === refresh_token) {
        req.body = req.jwt;
        return next();
    } else {
        return res.status(400).send({error: 'Invalid refresh token'});
    }
};


exports.validJWTNeeded = (req, res, next) => {
    let jwtObj;
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                jwtObj = jwt.decode(authorization[1])
                req.jwt = jwt.verify(authorization[1], secret);
                return next();
            }

        } catch (err) {
            res.statusMessage="TOKEN EXPIRED!!"
            return res.status(403).send({error:"TOKEN EXPIRED!!!"});
        }
    } else {
        return res.status(401).send();
    }
};

exports.signedButExpiredJWTNeeded = (req, res, next) => {
    let authorization;
    if (req.headers['authorization']) {
        try {
            authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], secret);
                
                return next();
            }

        } catch (err) {
            if(err.message === "jwt expired"){
                req.jwt = jwt.decode(authorization[1], secret);
                return next();
            }
            else{
                return res.status(403).send({error:"TOKEN EXPIRED!!!"});
            }
            
        }
    } else {
        return res.status(401).send();
    }
};