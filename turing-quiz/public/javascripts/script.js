$(function() {

	var countdown = 100;
	var cwidth;
	var stupidcurve = false;
	var slightpanic = false;
	var panic = false;
	var superpanic = false;
	var btnc;

	//to increment number of hits
	function hit() {
		var hits = Cookies.get('hits');
		hits = parseInt(hits, 10);
		hits++;
		Cookies.set('hits', hits);
	}

	//to get new bird names
	function newbirds() {
		var birdcnt = Cookies.get('birdcnt');
		birdcnt = parseInt(birdcnt, 10);
		birdcnt+=3;
		Cookies.set('birdcnt', birdcnt);

		var notbirdcnt = Cookies.get('notbirdcnt');
		notbirdcnt = parseInt(notbirdcnt, 10);
		notbirdcnt++;
		Cookies.set('notbirdcnt', notbirdcnt);	
	}

	//run every ten milliseconds seconds
	var timer = setInterval(function() {
		cwidth = countdown.toString(10) + "%";
		$("#timer").css("width", cwidth);

		if (countdown < 45 && !slightpanic){
			$("#timer").css("background-color", "#ddae2c");
			slightpanic = true;
		}

		if (countdown < 30 && !panic){
			$("#timer").css("background-color", "#ce603b");
			panic = true;
		}

		if (countdown < 15 && !superpanic){
			$("#timer").css("background-color", "#ce3b3b");
			superpanic = true;
		}

		if (countdown < 3 && !stupidcurve){
			$("#timer").css("border-radius", "80px");
			stupidcurve = true;
		}

		countdown-= 0.1;
		if (countdown <= 0) {
			
			hit();

			newbirds();

			countdown = 100;

			location.reload(true);
		}

	}, 10);

    $(".gameBtn").click(function() {
		var na = event.target.id.split('_');
		var notbirdn = Cookies.get('notbirdn')

		newbirds();

		if (parseInt(na[1], 10) == notbirdn) {
			$("#correct").css("display", "initial");

			var score = Cookies.get('score');
			score++;
			Cookies.set('score', score);

			btnc = "#5FA071";
			$(this).css("background-color", btnc);

			$(this).css("transition", "background-color 1s ease");
			var thisb = this;
		
		} else {
			$("#incorrect").css("display", "initial");

			hit();

			btnc = "tomato";
			$(this).css("background-color", btnc);

			var rightid = '#' + na[0] + '_' + notbirdn;
			$(rightid).css("background-color", "#5FA071");

			$(this).css("transition", "background-color 1s ease");

			var thisb = this;
		}

		clearInterval(timer);
		
		//make clicked button blink
		setTimeout(function() {
			$(thisb).css("background-color", "#010413");
			setTimeout(function() {
				$(thisb).css("background-color", btnc);
				setTimeout(function() {
					$(thisb).css("background-color", "#010413");
				}, 500);
			}, 500);
		}, 500);

		//hide correct/incorrect
		setTimeout(function(){
			$("#correct").css("display", "none");
			$("#incorrect").css("display", "none");

    		location.reload(true);
		}, 2000);
	});
});


