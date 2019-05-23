var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	res.cookie("hits", 0);
	res.cookie("score", 0);
	res.cookie("birdcnt", 0);
	res.cookie("notbirdcnt", 0);
	
	res.render('index');
});

router.post('/getwelcome', function(req, res) {
	res.cookie("page", "welcome");
    res.redirect('/intro');
});

router.post('/getcompany', function(req, res) {
	res.cookie("page", "company");
    res.redirect('/intro');
});

router.post('/getyourjob', function(req, res) {
	res.cookie("page", "yourjob");
    res.redirect('/intro');
});

router.post('/gettoneofvoice', function(req, res) {
	res.cookie("page", "toneofvoice");
    res.redirect('/intro');
});

router.post('/getdemo', function(req, res) {
	res.cookie("page", "demo");
    res.redirect('/intro');
});

router.post('/playagain', function(req, res) {

	res.cookie("hits", 0);
	res.cookie("score", 0);
	res.cookie("birdcnt", 0);
	res.cookie("notbirdcnt", 0);

    res.redirect('/play');
});

module.exports = router;


