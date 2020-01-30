//=============================================================================
// IndieNoNo Plugins - Remember Map Position
// IndieNoNo_RememberMapPosition.js
//=============================================================================

var Imported = Imported || {};

var IndieNoNo = IndieNoNo || {};
IndieNoNo.RemMapPos = IndieNoNo.RemMapPos || {};

//=============================================================================
 /*:
 * @plugindesc v1.0 Simply an empty plugin.  To serve as a starting point for
 * making new plugins.
 *
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * WARNING: This plugin is best used with RPG Maker MV 1.5.0 or above!
 *
 * While in RPG Maker MV, there's the ability to remember your map position
 * between maps using the tool directly, this takes care of automatically doing
 * it for yoe between map transfers.
 *
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * Setup the plugin parameter values with your variable ids.
 *
 *
 * @param PreviousMap
 * @test Previous Map
 * @desc The Id of the VARIABLE to store the previous map in
 * @type number
 * @min 1
 * @max 999
 *
 * @param PreviousX
 * @text Previous X Position
 * @desc The Id of the VARIABLE to store the previous map x position
 * @type number
 * @min 1
 * @max 999
 *
 * @param PreviousY
 * @text Previous Y Position
 * @desc The Id of the VARIABLE to store the previous map y position
 * @type number
 * @min 1
 * @max 999
 */
//=============================================================================

(function() {

  RemMapPos.Param.PreviousMap = PluginManager.parameters('PreviousMap');
  RemMapPos.Param.PreviousX = PluginManager.parameters('PreviousX');
  RemMapPos.Param.PreviousY = PluginManager.parameters('PreviousY');

  // This is called whenever you transfer a player to a new map.
  Beard.Travel.reserveTransfer = Game_Player.prototype.reserveTransfer;
  Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType){

    //Set the variables before we transfer
    if($gameMap._mapId && $gamePlayer.screenX() && $gamePlayer.screenY()){
      $gameVariables.setValue(RemMapPos.Param.PreviousMap, $gameMap._mapId);
      $gameVariables.setValue(RemMapPos.Param.PreviousX, $gamePlayer._x);
      $gameVariables.setValue(RemMapPos.Param.PreviousY, $gamePlayer._y);
    }

    //Transfer
    Beard.Travel.reserveTransfer.call(this, mapId, x, y, d, fadeType);

  }

})();
