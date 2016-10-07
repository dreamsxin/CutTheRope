function createStartPage() {
	var bg = new PIXI.Sprite(PIXI.Texture.fromFrame("../assets/mainbg.jpg"));
	world.vWorld.addChild(bg);
	bg.anchor.x = bg.anchor.y = 0;
	bg.scale.x = bg.scale.y = engine_static.worldHeight / 768;

	var startBtn = createBallObject({
		position: {
			x: engine_static.worldWidth / 2,
			y: engine_static.worldHeight / 2 + 100,
		},
		radius: 50,
		texture: "../assets/startBtn.png",
		name: "startBtn",
		isStatic: true
	})

	startBtn.touchDown = function() {
		startBtn.v.texture = PIXI.Texture.fromImage('../assets/startBtn2.png')
	}
	startBtn.touchEnd = function() {
		clearAllGameThings();
		inLevel = false;
		//engine_static.renderPause=true;
		var bg = new PIXI.Sprite(PIXI.Texture.fromFrame("../assets/levelSelect.jpg"));
		world.vWorld.addChild(bg);
		bg.anchor.x = bg.anchor.y = 0;
		bg.scale.x = bg.scale.y = engine_static.worldHeight / 576;
		$(".swiper-container").fadeIn(500);
	}
	startBtn.touchLost = function() {
		startBtn.v.texture = PIXI.Texture.fromImage('../assets/startBtn.png');
	}
}

function makeGameScene() {
	createStartPage();
	$("#backImg").bind("click", function() {
		$(".swiper-container").hide();
		createStartPage();
	})
	touchObject.createTouchListen();
	update();
}

var currentLevel=-1;
function startLevel(index) {
	currentLevel=index;
	$(".swiper-container").hide();
	starsGet=0;
	ropes=[];
	coverClose();
	setTimeout(function() {
		levelScript[index]();
		setTimeout(function() {
			coverOpen();
			setTimeout(function() {
				$(".coverDown").hide();
				$(".coverUp").hide();
				inLevel = true;
			}, 500);
		}, 100);
	}, 500);
}

function coverClose() {
	var $down = $(".coverDown2");
	var $up = $(".coverUp2");
	$down.removeClass("coverDown2").addClass("coverDown").addClass("animateDown2up").show();
	$up.removeClass("coverUp2").addClass("coverUp").addClass("animateUp2down").show();
}

function coverOpen() {
	var $down = $(".coverDown");
	var $up = $(".coverUp");
	$down.removeClass("coverDown").addClass("coverDown2").addClass("animateDown2down").show();
	$up.removeClass("coverUp").addClass("coverUp2").addClass("animateUp2up").show();
}