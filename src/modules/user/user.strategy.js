const { request } = require('express');
const passport = require('passport');
const { Strategy } = require('passport-jwt');
const User = require('../user/user.model');
const { where } = require('sequelize');

module.exports = function() {
    function cookieExtractor( req ) {
        let token = null;
        if(req && req.signedCookies){
            token = req.signedCookies['access_token'];
        }
        return token;
    };

    passport.use("user-jwt", new Strategy({secretOrKey: process.env.TOKEN_SECRET, jwtFromRequest: cookieExtractor}, function(payload, done) {
        User.findOne({
            where:{
                id: payload.id
            }
        })
        .then(user => {
            if(user) return done(null, user);
            return done(null, false);
        })
    }));
};