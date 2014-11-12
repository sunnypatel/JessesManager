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
  login: function (req, res) {
    var bcrypt = require('bcrypt');

    User.findOneByEmail(req.body.email).exec(function (err, user) {
      if (err) res.json({ error: 'DB error' }, 500);

      if (user) {
        bcrypt.compare(req.body.password, user.password, function (err, match) {
          if (err) res.json({ error: 'Server error' }, 500);

          if (match) {
            // password match
            req.session.user = user.id;
            res.json(user);
          } else {
            // invalid password
            if (req.session.user) req.session.user = null;
            res.json({ error: 'Invalid password' }, 400);
          }
        });
      } else {
        res.json({ error: 'User not found' }, 404);
      }
    });
  },
	loginForm: function (req, res) {
		return res.view();
	}
};
