function Auth(req, res, next) {
	console.log('Authenticating...');
	 next();
}

module.exports = Auth;