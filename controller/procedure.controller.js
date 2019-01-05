module.exports = {
	signUp : function(req, res) { // SignIn Controller
		res.render('sign-up.pug');
	},
	signIn : function(req, res) {
		res.render('sign-in.pug');
	}
}