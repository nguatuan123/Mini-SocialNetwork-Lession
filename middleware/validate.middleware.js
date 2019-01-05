// Low-Db
const db = require('../modules-extra/low-db.js');
// MD5
const md5 = require('md5');

var checkEmail = function(email){
	let originEmail = db.get('usersSecurity')
		.find({email : email})
		.value();
	if ( originEmail ) {
		return false;
	} else {
		return true;
	}
}

var checkEmailLogin = function(email) {
	var originEmail = db.get('usersSecurity')
		.find({email : email})
		.value();
	if ( !originEmail ) {
		return false;
	} else {
		return originEmail;
	}
}

module.exports = {
	signUp : function(req, res, next) {
		let name = req.body.name;
		let birthDate = req.body.birthDate;
		let email = req.body.email;
		let password = req.body.password;
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if ( !name || !birthDate || !email || !password ) {
			res.send('0');
			return 0;
		} else if (!re.test(email)) {
			res.send('0');
	  		return 0;
		} else if ( !checkEmail(email) ) {
			res.send(false);
			return 0;
		} else {
			next();
		}
	},
	signIn : function(req, res, next) {
		let email = req.body.email;
		let password = req.body.password;
		let originEmail = checkEmailLogin(email);
		if ( !email || !password ) {
			res.send('0');
			return 0;
		} else {
			password = md5(password);
			if ( !originEmail ) {
				res.send(false);
				return 0
			} else {
				if ( originEmail.password !== password ) {
					res.send(false);
					return 0;
				} else {
					next();
					return 0;
				}
			}
		}
		
	},
	licenseFalsed : function(req, res, next) {
		if ( !req.signedCookies.id ) {
			res.redirect('/procedure/sign-in');
			return 0;
		} else {
			next();
		}
	},
	licensePassed : function(req, res, next) {
		if ( req.signedCookies.id ) {
			res.redirect('/');
			return 0;
		} else {
			next();
		}
	},
	clearCookies: function(req, res, next) {
		if ( !req.signedCookies.id ) {
			return 0;
		} else {
			next();
			return 0;
		}
	}
}