module.exports = function(req, res, next){
	if (!req.user) {
		res.end('Not authorized', 401)
	}	else {
		next()
	}
}
