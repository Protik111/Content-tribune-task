require('dotenv').config('../.env');
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('auth-token');

    if(!token){
        res.status(400).json({ msg: 'Authorization Failed' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is Invalid' })
    }
}