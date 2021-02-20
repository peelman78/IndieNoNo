//-----------------------------------------------------------------------------
//  IndieNoNo PseudoCursor
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//-----------------------------------------------------------------------------
// 	Terms: Free for commercial and non-commercial with credit.
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.IndieNoNoPseudoCursor = true;

var IndieNoNo = IndieNoNo || {};
IndieNoNo.PseudoCursor = IndieNoNo.PseudoCursor || {};

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.0)
 *
 * Plugin let's you create an on screen cursor using any image you choose.  Cursor respods to
 * directional key presses (up, down, left, right), and 'ok' key for action.  Use this if you have
 * touchscreen/mouse scenes and want to provide support for keyboard or gamepad - since player cant
 * touch the screen or has no mouse the cursor serves this purpose.
 *
 * Example scenes using this plugin with different cursors and setups can be seen at
 *
 * Example usage: https://youtu.be/rLN5wukw00w
 *
 * 	circuit - IndieNoNo.PseudoCursor.activate('img/system/CursorCircuit.png', 307, 105, 1, 1, 0, 0, 75, 5, 5, 10);
 *
 *  	Makes a 5x5 grid, jumping 75 pixels each time.  10 frame wait time between moves.
 *
 *  elevator - IndieNoNo.PseudoCursor.activate('img/system/CursorElevator.png', 566, 50, 1, 1, 0, 0, 145, 1, 4, 10);
 *
 *    Makes a 1x4 grid (column), with 145 pixels between moves.  10 frame wait time.
 *
 * 	darts - IndieNoNo.PseudoCursor.activate('img/system/Cursor.png', 278, 512, 0, 0, 0, 0, 2, 0, 0, 0);
 *
 *    Makes a cursor that just moves when up, down left pressed, no wait time or jump.
 *
 * 	puzzle - IndieNoNo.PseudoCursor.activate('img/system/CursorPuzzle.png', 105, 55, 1, 1, 0, 0, 48, 11, 6, 10);
 *
 *		Makes a cursor on a 11x6 grid, 10 frame wait time.
 *
 *	piano - IndieNoNo.PseudoCursor.activate('img/system/CursorPiano.png', 337, 300, 1, 1, 0, 0, 48, 7, 1, 10);
 *
 *		Makes a cursor on a 7x1 grid to play piano keys, 10 frame wait time.
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {

	IndieNoNo.PseudoCursor.activate = function(cursor='Cursor.png', x, y, hor=0, vert=0, aX=0.5, yX=0.5, speed=2, maxHor=0, maxVert=0, updateDelay=0) {

		IndieNoNo.PseudoCursor.active = true;
		IndieNoNo.PseudoCursor.updateDelay = updateDelay;//Frames to wait between processing presses
		IndieNoNo.PseudoCursor.x = x;//Start x
		IndieNoNo.PseudoCursor.y = y;//Start y
		IndieNoNo.PseudoCursor.hor = hor;//Start hor
		IndieNoNo.PseudoCursor.vert = vert;//Start vert
		IndieNoNo.PseudoCursor.anchorY = aX;
		IndieNoNo.PseudoCursor.anchorX = yX;
		IndieNoNo.PseudoCursor.speed = speed;//The number of pixels to move per direction press
		IndieNoNo.PseudoCursor.maxHor = maxHor;//Horizontal step limit
		IndieNoNo.PseudoCursor.maxVert = maxVert;//Vertical step limit
		IndieNoNo.PseudoCursor.cursorImg = cursor;
		IndieNoNo.PseudoCursor.isOK = 155;
		IndieNoNo.PseudoCursor.hidden = false;

		IndieNoNo.PseudoCursor.cursor = new Sprite_Cursor();
		SceneManager._scene.addChild(IndieNoNo.PseudoCursor.cursor);

	};

	IndieNoNo.PseudoCursor.deActivate = function() {
		IndieNoNo.PseudoCursor.active = false;
		SceneManager.scene().removeChild(IndieNoNo.PseudoCursor.cursor);
	};

	IndieNoNo.PseudoCursor.hide = function(){
		IndieNoNo.PseudoCursor.hidden = true;
		IndieNoNo.PseudoCursor.cursor.visible = false;
	}

	IndieNoNo.PseudoCursor.show = function(){
		IndieNoNo.PseudoCursor.hidden = false;
		IndieNoNo.PseudoCursor.cursor.visible = true;
	}

	//-----------------------------------------------------------------------------
	//                                  SCENE
	//-----------------------------------------------------------------------------

	function Sprite_Cursor() {
		this.initialize.apply(this, arguments);
	}

	Sprite_Cursor.prototype = Object.create(Sprite_Base.prototype);
	Sprite_Cursor.prototype.constructor = Sprite_Cursor;

	Sprite_Cursor.prototype.initialize = function() {
		Sprite_Base.prototype.initialize.call(this);
		this.bitmap = ImageManager.loadNormalBitmap(IndieNoNo.PseudoCursor.cursorImg, 0);
		this.hor = IndieNoNo.PseudoCursor.hor;
		this.vert = IndieNoNo.PseudoCursor.vert;
		this.x = IndieNoNo.PseudoCursor.x;
		this.y = IndieNoNo.PseudoCursor.y;
		this.anchor._x = IndieNoNo.PseudoCursor.anchorX;
		this.anchor._y = IndieNoNo.PseudoCursor.anchorY;
		this.z = 5;
	};

	Sprite_Cursor.prototype.update = function() {
		Sprite_Base.prototype.update.call(this);
		if (!IndieNoNo.PseudoCursor.active) return;
		this.visible = !IndieNoNo.PseudoCursor.hidden;

		if(this.updateDelay > 0){
			this.updateDelay--;
			return;
		}
		this.updateTouch();
	};

	Sprite_Cursor.prototype.updateTouch = function() {

		if (TouchInput.isPressed()) {
			let x = TouchInput._x - IndieNoNo.PseudoCursor.x;
			let y = TouchInput._y - IndieNoNo.PseudoCursor.y;
			let maxX = (IndieNoNo.PseudoCursor.maxHor * IndieNoNo.PseudoCursor.speed);
			let maxY = (IndieNoNo.PseudoCursor.maxVert * IndieNoNo.PseudoCursor.speed);

			if(x > maxX || x < 0 || y > maxY || y < 0){
				return;
			}

			for(let i = 0; i <= IndieNoNo.PseudoCursor.maxHor; i++){
				let newX = ((i+1) * IndieNoNo.PseudoCursor.speed) - IndieNoNo.PseudoCursor.speed;
				if(x <= newX){
					this.x = newX + IndieNoNo.PseudoCursor.x - IndieNoNo.PseudoCursor.speed;
					this.hor = i;
					break;
				}
			}
			for(let i = 0; i <= IndieNoNo.PseudoCursor.maxVert; i++){
				let newY = ((i+1) * IndieNoNo.PseudoCursor.speed) - IndieNoNo.PseudoCursor.speed;
				if(y <= newY){
					this.y = newY + IndieNoNo.PseudoCursor.y - IndieNoNo.PseudoCursor.speed;
					this.vert = i;
					break;
				}
			}
			return;
		}

		let speed = IndieNoNo.PseudoCursor.speed;
		if(Input.isPressed('right')){
			this.updateDelay = IndieNoNo.PseudoCursor.updateDelay;
			this.hor++;
			if(IndieNoNo.PseudoCursor.maxHor > 0 && this.hor > IndieNoNo.PseudoCursor.maxHor){
				this.x = IndieNoNo.PseudoCursor.x;//Back to start
				this.hor = 1;
			}
			else{
				this.x += speed;
			}
		}
		else if (Input.isPressed('left')){
			this.updateDelay = IndieNoNo.PseudoCursor.updateDelay;
			this.hor--;
			if(IndieNoNo.PseudoCursor.maxHor > 0 && this.hor < 1){
				this.x = IndieNoNo.PseudoCursor.x + ((IndieNoNo.PseudoCursor.maxHor-1) * IndieNoNo.PseudoCursor.speed);//To end
				this.hor = IndieNoNo.PseudoCursor.maxHor;
			}
			else{
				this.x -= speed;
			}
		}
		if(Input.isPressed('up')){
			this.updateDelay = IndieNoNo.PseudoCursor.updateDelay;
			this.vert--;
			if(IndieNoNo.PseudoCursor.maxVert > 0 && this.vert < 1){
				this.y = IndieNoNo.PseudoCursor.y + ((IndieNoNo.PseudoCursor.maxVert-1) * IndieNoNo.PseudoCursor.speed);//To bottom
				this.vert = IndieNoNo.PseudoCursor.maxVert;
			}
			else{
				this.y -= speed;
			}
		}
		else if (Input.isPressed('down')){
			this.updateDelay = IndieNoNo.PseudoCursor.updateDelay;
			this.vert++;
			if(IndieNoNo.PseudoCursor.maxVert > 0 && this.vert > IndieNoNo.PseudoCursor.maxVert){
				this.y = IndieNoNo.PseudoCursor.y;//Back to top
				this.vert = 1;
			}
			else{
				this.y += speed;
			}
		}


		if(Input.isTriggered('ok')){
			$gameVariables.setValue(IndieNoNo.PseudoCursor.isOK, true);
		}
		else{
			//this.updateDelay = IndieNoNo.PseudoCursor.updateDelay;
			$gameVariables.setValue(IndieNoNo.PseudoCursor.isOK, false);
		}
	};

})();
