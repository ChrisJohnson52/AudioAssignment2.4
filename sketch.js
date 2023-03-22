//Christian-Thomas Douglas De Guzman Johnson
//Audio Assignment 2.4
//Make it Sing!

var roach = [];
var count = 60;
var moving = 0;
var score = 0;
var alive = true;
var s = 0;
var timeRemaining = 30;
var startTime = 0;
var gameState = 0; 
var animationSpeed = 4;
var previousScore = score;
var gameAudio;
var squishSound;
var freeverb;
var lfo;
var roachNoise;
var introSong;
var gameOverSong;
var youWinSong;

function preload()
{
	for(var i = 0; i < count; i++)
	{
		roach[i] = new Walker("RoachSprite.png", random(710) + 40, random(480) +20, random([-1, +1]), alive);
	}

	//Audio Preload
	gameAudio = new Tone.Player("media/BugSong.mp3").toMaster();
	introSong = new Tone.Player("media/IntroSong.mp3").toMaster();
	gameOverSong = new Tone.Player("media/GameOverSong.mp3").toMaster();
	youWinSong = new Tone.Player("media/YouWinSong.mp3").toMaster();
	squishSound = new Tone.NoiseSynth();
	squishSound.volume.value = +0.1;
	freeverb = new Tone.Freeverb().toMaster();
	freeverb.roomSize = .2;
	squishSound.connect(freeverb);
	lfo = new Tone.LFO(10, -30, -15).start();
	roachNoise = new Tone.Noise().toMaster();
	lfo.connect(roachNoise.volume);
}

function setup() 
{
	createCanvas(750, 500);
	imageMode(CENTER);
	gameAudio.autostart = false;
	introSong.autostart = true;
	introSong.loop = true;
	gameOverSong.loop = true;
	youWinSong.loop = true;
}

function clicked()
{
	if(mouseIsPressed)
	{
		click = true;
	}
	else
	{
		click = false;
	}
	return false;
}

function draw()
{
	background(200);

	if (gameState == 0)
	{
		introSong.autoStart = true;
			textSize(50);
			fill(255, 255, 255);
			text("Roach Squish", 215, 100);
			fill(255, 255, 255);
			textSize(22);
			text("Play Game", 315, 230);
			textSize(12);
			text("Click Screen to hear intro audio", 280, 400);
			fill(0, 0, 150, 50);
			rect(305, 200, 125, 50);
			if(mouseX >= 305 && mouseX <= 430 && mouseY >= 200 && mouseY <=250 && click == true)
			{
				introSong.stop();
				gameAudio.start();
				roachNoise.start();
				startTime = second();
				gameState = 1;
			}
		}

	if(gameState == 1)
	{
		s = second();
		timeRemaining = 30 - abs(startTime - s);
		for(var i = 0; i < count; i++)
		{
			roach[i].draw();
			textSize(24);
		}
		text("Score: " + score, 30, 30);
		fill(255, 255, 255);
		text("Time Remaining: " + timeRemaining, 30, 60);
		if(timeRemaining == 0)
		{
			gameAudio.stop();
			roachNoise.stop();
			gameOverSong.start();
			gameState = 2;
		}
	}
	if(gameState == 2)
	{
		fill(255, 255, 255);
		textSize(40);
		text("Game Over", 250, 120);
		textSize(22);
		text("Roaches Squished: " + score, 255, 200);
		textSize(12);
		text("Refresh the page to play again.", 280, 400);
	}
	if(score >= 60)
	{
		gameAudio.stop();
		roachNoise.stop();
		youWinSong.start();
		gameState = 4;
	}
	if(gameState == 4){
		textSize(50);
		text("You Win!!!", 250, 120);
		textSize(22);
		text("Roachs Squished: " + score, 255, 200);
		textSize(12);
		text("Refresh the page to play again.", 280, 400);
	}
	clicked();
}

function Walker(imageName, x, y, moving, alive)
{
	this.spritesheet = loadImage(imageName);
	this.frame = 0;
	this.x = x;
	this.y = y;
	this.moving = moving;
	this.facing = moving;
	this.alive = alive

	this.draw = function() 
	{
		push();
		translate(this.x, this.y);
		if(this.facing < 0)
		{
			scale(-1.0, 1.0);
		}
		if(this.alive == true)
		{
			if(this.moving == 0)
			{
				image(this.spritesheet, 0, 0, 80, 80, 0, 0, 80, 80);
			}
			else{
				if(this.frame == 0)
				{
					image(this.spritesheet, 0, 0, 80, 80, 0, 0, 80, 80);
				}
				if(this.frame == 1){
					image(this.spritesheet, 0, 0, 80, 80, 80, 0, 80, 80);
				}
				if(this.frame == 2){
					image(this.spritesheet, 0, 0, 80, 80, 160, 0, 80, 80);
				}
				if(this.frame == 3){
					image(this.spritesheet, 0, 0, 80, 80, 240, 0, 80, 80);
				}
				if(this.frame == 4){
					image(this.spritesheet, 0, 0, 80, 80, 320, 0, 80, 80);
				}
				if(this.frame == 5){
					image(this.spritesheet, 0, 0, 80, 80, 400, 0, 80, 80);
				}

				if(score >= 0 && score < 10)
				{
					animationSpeed = 3;
					gameAudio.volume.value = -15;
				}
				if(score >= 10 && score <= 25)
				{
					animationSpeed = 1;
					gameAudio.volume.value = -5;
				}
				if(score > 25 && score < 40)
				{
					animationSpeed = .5;
					gameAudio.volume.value = +5;
				}
				if(score >= 40)
				{
					animationSpeed = .25;
					gameAudio.volume.value = +15;
				}

				if(frameCount % animationSpeed == 0)
				{
					this.frame = (this.frame + 1) % 5;
					this.x = this.x + 6 * this.moving;
					if(this.x < 40 || this.x > width - 40)
					{
						this.moving = -this.moving
						this.facing = -this.facing
					}
				}
			}
		}
		else
		{
			image(this.spritesheet, 0, 0, 80, 80, 480, 0, 80, 80);
		}
		pop();
	}

	this.stop = function()
	{
		this.moving = 0;
		this.frame = 3;
	}

	this.go = function(direction)
	{
		this.moving = direction;
		this.facing = direction;
	}

	this.squish = function(x, y)
	{
		if(this.x -40 < x && x < this.x + 40 &&
	 		this.y -40 < y && y < this.y + 40 ){
			this.moving = 0;
			this.mouseX = x;
			this.mouseY = y;
			this.initialX = this.x;
			this.initialY = this.y;
			if(this.alive == true){
				score++;
				squishSound.triggerAttackRelease("16n");
			}
			this.alive = false;
		}
	}
}

function mousePressed()
{
	for(var i = 0; i < count; i++)
	{
		roach[i].squish(mouseX, mouseY);
	}
}