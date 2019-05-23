var express = require('express');
var router = express.Router();
var birds = require('../public/docs/birds.json')

/* GET users listing. */
router.get('/', function(req, res, next) {

	var hits = req.cookies.hits;
	var birdcnt = req.cookies.birdcnt;
	var notbirdcnt = req.cookies.notbirdcnt;
	var score = req.cookies.score;
	var values = []
	var notbirdn = Math.floor(Math.random() * 4);

	if (typeof hits == 'undefined') {	
		res.cookie("hits", 0);
		hits = 0;
	}
	if (typeof score == 'undefined') {	
		res.cookie("score", 0);
		score = 0;
	}
	if (typeof birdcnt == 'undefined') {	
		res.cookie("birdcnt", 0);
		birdcnt = 0;
	}
	if (typeof notbirdcnt == 'undefined') {	
		res.cookie("notbirdcnt", 0);
		notbirdcnt = 0;
	}

	console.log(hits);
	if (hits >= 3) {
		res.redirect('/about');
	}

	var n = 0;
	for (var i = 0; i < 4; i++) {
		if (i == notbirdn) {
			values.push(birds.notbirds[notbirdcnt]);		
		} else {
			values.push(birds.birds[birdcnt]);
			birdcnt++;
		}
	}

	res.cookie("notbirdn", notbirdn);

	res.render('play', {
		values : values,
		hits: hits,
		req: req
  	});
});

module.exports = router;
