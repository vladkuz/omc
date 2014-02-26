// Loading... page
var loadingPage = function (g) {
	this.show = function () {
		
	};
	
	this.showProgress = function (p) {
		console.log('Percentage ' + p + '%');
	};
	
	this.hide = function () {
		
	};
};

// Menu page
var menuPage = function (g) {
	this.show = function (choicesArray, callback) {
		// Present choices
		// ...
		var choiceId = ~~(Math.random()*choicesArray.length);
		console.log(choiceId);
		callback(choicesArray[choiceId]);
	};
};


// Game page
var gamePage = function (g) {
	this.game = g;
	this.show = function (callback) {
		// ...
		// show game play
		// ...
		callback({});
	};
};


var game = {
	
	debug:true,
	
	resources: null,

	currentUser: {},
	state: "",
	
	pages: {},
	
	
	start: function () {
		// do loading
		var 
			that = this,
			loadPage = new loadingPage(this);
			
		this.state = 'loading';
			
		this.resources = new resources();

		loadPage.show();
		
		this.resources.load(
				function (p) {
					loadPage.showProgress(p);
				},
				function() {
					loadPage.hide();
					that.displayMenu();
				}
		);
	},
	
	displayMenu: function () {
		this.state = 'menu';

		if ( typeof this.pages.menuPage == 'undefined' ) {
			this.pages.menuPage = new menuPage(this);
		}
		
		var 
			that = this;

		this.log('Displaying menu now.');
		this.pages.menuPage.show(["play", "bakery", "options", "tutorial"], function (choice) { that.onMenuChoice(choice); });
		

	},
	
	onMenuChoice: function (choice) {
		
		this.log('game received menu choice: ' + choice);
		
		switch(choice) {
			case "play":
				this.playGame();
				break;
			case "bakery":
				this.goToBakery();
				break;
			case "options":
				this.optionsMenu();
				break;
			case "tutorial":
				break;
		}
	},
	
	playGame:function () {
		this.log('Displaying PlayGame now.');
		
		if ( typeof this.pages.gamePage === 'undefined') {
			this.pages.gamePage = new gamePage(this);
		}
		
		var 
			that = this;
			
		this.pages.gamePage.show(function(gameResult) { that.gameOver(gameResult); });
	},
	
	gameOver: function (gameResult) {
		this.log('Displaying Game Over now.');		
	},
	
	goToBakery: function () {
		this.log('Displaying Go To Bakery now.');		
	},
	
	optionsMenu: function () {
		this.log('Displaying Options now.');		
	},
	
	log:function (txt) {
		if ( this.debug === true) {
			console.log('OMC::' + txt);
		}
	}
};