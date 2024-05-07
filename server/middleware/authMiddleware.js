// authMiddleware.js

const jwt = require('jsonwebtoken');
const config = require('../config/config');


const requireAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, config.jwtSecret , (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            } else {
                req.userId = decodedToken.userId;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'Token not provided' });
    }
};

module.exports = { requireAuth };
