
players= {
    blue: 0,
    red: 0,
    yellow: 0,
    green: 0,
    }

var game = {
    gameState: 0,
    wins: 0,
    losses: 0,
    enemyHealth: 0,
    currentDamage: 0,
    lossVis: "0",
    winVis: "0",
    
    gameSetup: function(){
        this.resetDamageDealt(this.currentDamage);
        this.winScreenVis(this.winVis);
        this.lossScreenVis(this.lossVis);
        this.resetDamageDealt(this.currentDamage);
        this.chooseEnemyHealth(this.enemyHealth);
        this.choosePlayerDamage(players);
        this.assignDamageIds(players);
        this.gameState = this.gameState + 1;
        console.log("good job me")
        console.log(game)
    },
    //runs at upon starting and at the end of each game after an additional click

    chooseEnemyHealth: function(arr){
        this.enemyHealth = Math.floor((Math.random() * 40) + 80);
        $("#waspHealth").text(this.enemyHealth);
        //this is choosing health for the enemy and should be passed the enemyHealth property
    },

    choosePlayerDamage: function(obj){
        for(var key in obj){
              if(obj.hasOwnProperty(key)){
                   obj[key] = Math.floor((Math.random()*12) + 1); 
                }
         }
       return obj;    
    },
    //assigns the damage value for the players 
    assignDamageIds: function(obj){
        var damArr = [];
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                damArr.push(obj[key]);
            }
        }
        for(i=0; i<4; i++){
            $(".playerBee"+[i]).attr("id", damArr[i]);
    }},
    //this takes the random damages assigned to the player properties in the step above and adds an ID attribute to each of the player images that matches their randomly generated damage for the game

    resetDamageDealt: function (){
        this.currentDamage = 0;
        $("#damageScore").text(this.currentDamage);
    },
    //resets the damage to 0 after each turn

    displayDamageDealt: function (arr){
        $("#damageScore").text(arr);
    },
    //will be called for at the end of each turn

    lossScreenVis: function(vis){
        $(".lossCard").animate({ opacity: vis});
    },
    //will manipulate the visibility of the loss screen at game end and reset

    winScreenVis: function(vis){
        $(".winCard").animate({ opacity: vis});
    },
    //will manipulate the visibility of the win screen at game end and reset

    checkGameOver: function(event){
        if (game.currentDamage > this.enemyHealth){
            //this function is designed for game.currentDamage to be fed in. this "if" checks for a loss by overshooting the target damage. If so, this runs.
            this.lossScreenVis("1");
            //sets loss screen to visible
            this.losses++;
            //adds a loss
            $("#losses").text(this.losses);
            //updates losses displayed
            this.gameState = this.gameState-1;
            //resets gameState
        }
        if(game.currentDamage === this.enemyHealth){
            //checks for a win of matching damage to health
            this.winScreenVis("1");
            //displays win screen
            this.wins++;
            //adds a win
            $("#wins").text(this.wins);
            //updates wins
            this.gameState = this.gameState-1;
            //resets gamestate
        }
        //else nothing, keep playing
    },

    gamePlay: function(event){
            var turnDamage = parseInt(event.target.id);
            //gets id from html element clicked
            game.currentDamage = game.currentDamage + turnDamage;
            //adds the value as a number to create new score
            game.displayDamageDealt(game.currentDamage);
            //displays new score
            game.checkGameOver();
            //runs gameCheck to see if the game is over
    }
}

$(document).ready(function(){
    $(".playerBee").on("click", function(event){
        if (game.gameState === 0) {
            //ensures the game setup only runs once. 
            game.gameSetup(event);
        } else{ 
            game.gamePlay(event);
        }
    })
})
