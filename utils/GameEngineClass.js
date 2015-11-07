GameEngineClass = Class.extend({

    gPlayer0: {
        pos: {
            x: 100,
            y: 100
        }
    },

    init: function () {},

    //----------------------------
    // Parameters:
    //  1) soundURL: a string representing the path to the sound
    //               file.
    //  2, 3) x, y:  The position within the game world where the
    //               sound should be playing from.
    //----------------------------
    playWorldSound: function (soundURL, x, y) {

        // First we check if the player exists. If not, then we
        // don't need to bother playing sounds.
        if (gGameEngine.gPlayer0 === null) return;

        // We set a shorthand for gGameEngine.gMap for ease of use.
        var gMap = gGameEngine.gMap;

        // Grab the maximum of half the width and height of the viewRect
        // for calculating screen distance from player.
        var viewSize = Math.max(gMap.viewRect.w, gMap.viewRect.h) * 0.5;

        // Grab the player's position.
        var oCenter = gGameEngine.gPlayer0.pos;

        // Task #1
        // Calculate the distance from the player's position to the
        // sound's position. Note that we don't want negative distances,
        // so you'll need to use the Math.abs function to get the
        // absolute value of the calculated difference.
        //
        // YOUR CODE HERE
        
        var dx=Math.abs(oCenter.x-x);
        var dy=Math.abs(oCenter.y-y);
        var distance = Math.sqrt(dx*dx+dy*dy);

        // Task #2
        // Normalize the distance from the player to the sound based
        // on the viewSize we calculated earlier.
        // 
        // If the distance from the player to the sound is more than
        // one viewSize away, the sound shouldn't play. If the sound
        // is half of a viewSize away, then the sound should play at
        // half volume, etc.
        //
        // YOUR CODE HERE

        var normDist=distance/viewSize;
        if (normDist>1) normDist=1;
        if (normDist<0) return;
        var volume = 1.0- normDist;
        


        // Task #3
        // Play the sound found at soundURL at the specified volume.
        // You can use the loadAsync and playSound methods to
        // accomplish this.
        //
        // YOUR CODE HERE
        var sound = gSM.loadAsync(soundURL, function(sObj){
            gSM.playSound(sObj.path,{
                looping:false,
                volume:volume
            });
        });

        
        
       
        
    }
});


        gGameEngine = new GameEngineClass();
        gGameEngine.gMap = gMap;
 