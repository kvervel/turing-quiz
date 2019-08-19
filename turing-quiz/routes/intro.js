var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var page = req.cookies.page;
	res.render(page, {
		crossed_logo: false,
		req: req
		});
});

module.exports = router;