/**
* Auth.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var md5 = require('MD5');

module.exports = {

  attributes: {

	email: {
		type: 'string',
		unique: true,
		required: true
	},
	password: {
		type: 'string',
		required: true
	},
	phone: {
		type: 'string',
		unique: true,
		required: true
	},
	accountType: {
		type: 'integer',
		required: true
	},
	token: {
		type: 'string'
	},
	tokenExpires: {
		type: 'datetime'
	},
	encryptPassword: function(){
        this.password = md5(this.password);
	}
  },
  
	beforeCreate: function(values, cb) {
		values.password = md5(values.password);
		cb();
	}
};
