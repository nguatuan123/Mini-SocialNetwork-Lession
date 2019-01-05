// Low-Db
const db = require('../modules-extra/low-db.js');

module.exports = {
	index : function(req, res) { // Index Controller
		let idCookies = req.signedCookies.id;
		let dataAuthor = db.get('usersInfo')
			.find({ id : idCookies })
			.value();
		let dataUsers = db.get('usersInfo')
			.value().slice(0, 3);
		res.render('index.pug', {
			dataAuthor: dataAuthor,
			dataUsers: dataUsers
		});
	},
	user : function(req, res) {
		let cookiesId = req.signedCookies.id;
		let paramsId = req.params.id;
		if ( cookiesId === paramsId ) {
			let dataAuthorSercurity = db.get('usersSercurity')
				.find({id: cookiesId})
				.value();
			let dataAuthorInfo  = db.get('usersInfo')
				.find({id: cookiesId})
				.value();

			res.render('author-wall.pug', {
				dataAuthorSercurity : dataAuthorSercurity,
				dataAuthorInfo : dataAuthorInfo
			});
		} else {
			let dataAuthorInfo  = db.get('usersInfo')
				.find({id: cookiesId})
				.value();
			res.render('user-wall.pug', {
				dataAuthorInfo: dataAuthorInfo
			});
		}
	} 
}

