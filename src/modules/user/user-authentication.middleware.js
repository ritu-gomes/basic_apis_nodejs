const jwt = require('jsonwebtoken');

const VerifyToken = (req, res, next) => {
    const token = req.headers['access-token'];
    if(!token) return res.status(403).send('authentication failed.');

    try {
        const decoded = jwt.verify(token, "iamhabib");

        req.user = decoded;

        next();
    }
    catch (err) {
        console.log(err);
        return res.status(401).send('invalid token');
    };
};

module.exports = VerifyToken;

