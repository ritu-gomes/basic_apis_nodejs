const jwt = require('jsonwebtoken');
const passport = require('passport');

const AuthStrategy = (req, res, next) => {

    const auth = passport.authenticate("user-jwt", async function (err, user) {

        if(err){
            console.log(err); 
            return res.status(500).send("internal server error");
        }
        if(!user) return res.status(401).send("unauthenticated user.") ;

        req.logIn(user, { session: false }, function(error) {
            if(error) return next(error);
            next();
        });
    });
    auth(req, res, next);
}

module.exports.AuthStrategy = AuthStrategy;







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

// module.exports = VerifyToken;