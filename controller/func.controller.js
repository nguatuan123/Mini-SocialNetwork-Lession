// Low db
const db = require('../modules-extra/low-db.js');
// To English modules
const toEn = require('../modules-extra/to-en.js');
// Short-Id
const shortId = require('shortid');
// MD5
const md5 = require('md5');
module.exports = {
	search : function(req, res) {
		let key = req.body.key;
		let data = db.get('usersInfo')
			.value();
		if ( key === '' || key === ' ' || key === '  ') {
			let result = data.slice(0, 3);
			let surplus = data.length - 3; // If array < 0 button load pagination hided
			res.send({data: result, surplus: surplus});
		} else {
			let result = data.filter(function(a) {
				return toEn(a.name).toLowerCase().indexOf(toEn(key).toLowerCase()) > -1;
			});		
			let surplus = result.length - 3; // If array < 0 button load pagination hided
			result = result.slice(0, 3);
			res.send({data: result, surplus: surplus});
		}
		return 0;
	},
	signUp : function(req, res) {
		let id = shortId.generate();
		let name = req.body.name;
		let birthDate = req.body.birthDate;
		let email = req.body.email;

		let password = req.body.password;
		password = md5(password); // md5 password security

		let newSecurUser = {
			id : id,
			email : email,
			password : password
		};
		let newInfoUser = {
			id : id,
			name : name,
			birth_date : birthDate,
			avatar : 'avatarUserImg/user-default.png'
		}

		db.get('usersSecurity')
			.push(newSecurUser)
			.write() // Do that Active

		db.get('usersInfo')
			.push(newInfoUser)
			.write() // Do that Active

		res.send(true)
	},
	signIn : function(req, res) {
		let email = req.body.email;
		let cookieId = db.get('usersSecurity')
			.find({email : email})
			.value().id;
		res.cookie('id', cookieId, { signed: true, path: '/' });
		res.send(true);
	},
	pagination : function(req, res) {
		let key = req.body.key;
		let directionNumber = req.body.directionNumber;
		let begin = (directionNumber * 3);
		let end = (directionNumber * 3) + 3;
		let data = db.get('usersInfo')
			.value();
		if ( key === '' || key === ' ' || key === '  ') {
			let result = data.slice(begin, end);
			let surplus = data.length - (end - 1); // If array < 0 button load pagination hided
			res.send({data: result, surplus: surplus});
		} else {
			let result = data.filter(function(a) {
				return toEn(a.name).toLowerCase().indexOf(toEn(key).toLowerCase()) > -1;
			});
			let surplus = result.length - (end - 1); // If array < 0 button load pagination hided
			result = result.slice(begin, end);
			res.send({data: result, surplus: surplus});
		}
		return 0;
	},
	uploadAvatar : function(req, res) {
			let fileData = req.file;
			let id = req.signedCookies.id;
			// let fileType = fileData.mimetype.split('/').slice(1).join('/');
			let tpmPath = fileData.destination + fileData.filename; // + '.' + fileType;
			tpmPath = tpmPath.split('/').splice(2).join('/');
			db.get('usersInfo')
  				.find({id: id})
  				.assign({ avatar: tpmPath }) // or .defaults depending on what you want to do
  				.write();
			res.send(tpmPath);			
	},
	clearCookies: function(req, res) {
		res.clearCookie('id');
		res.redirect('/procedure/sign-in');
		return 0;
	}
};