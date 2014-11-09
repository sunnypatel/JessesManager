/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function(req, res){
		var email = req.param('email');
		var password = req.param('password');
		var phone = req.param('phone');
		var accountType = req.param('accountType');

		User.create({
			email: email,
			password: password,
			phone: phone,
			accountType: accountType
		}).
		exec(function cb(err, created){
			res.send(created);
		});
	},
	login: function(req, res){
	}
};
