//=============================================================================
// My Code Utility Functions To Do Random Things
//=============================================================================

var Imported = Imported || {};

var MyCode = MyCode || {};
MyCode.Util = MyCode.Util || {};

(function() {

  //Do something
  MyCode.Util.doSomething = function(interpreter){

  }

  // This is called whenever you transfer a player to a new map.

  //IMPORTANT!!! Set here the proper values for the variables you created in your game.  The variable ID.
  const PREVIOUS_PLACE = 17;
  const PREVIOUS_X_POS = 18;
  const PREVIOUS_Y_POS = 19;

  Beard.Travel.reserveTransfer = Game_Player.prototype.reserveTransfer;
  Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType){

    //Set the variables before we transfer
    if($gameMap._mapId && $gamePlayer.screenX() && $gamePlayer.screenY()){
      $gameVariables.setValue(PREVIOUS_PLACE, $gameMap._mapId);
      $gameVariables.setValue(PREVIOUS_X_POS, $gamePlayer._x);
      $gameVariables.setValue(PREVIOUS_Y_POS, $gamePlayer._y);
    }

    //Transfer
    Beard.Travel.reserveTransfer.call(this, mapId, x, y, d, fadeType);

  }

})();
