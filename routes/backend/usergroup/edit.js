var UserGroup = require('../../../models/userGroup.js').UserGroup,
    HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');


exports.post = function(req, res, next) {
	console.log(req.body);
    UserGroup.edit(req.body, function(err){
        if(err){
            return next(new HttpMessage(403, err.message));
        }
        res.status(200).end();
    });
};