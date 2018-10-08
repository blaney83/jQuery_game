
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
    lossVis: "hidden",
    winVis: "hidden",
    
    gameSetup: function(){
        this.resetDamageDealt(this.currentDamage)
        this.winScreenVis(this.winVis);
        this.lossScreenVis(this.lossVis);
        this.resetDamageDealt(this.currentDamage);
        this.chooseEnemyHealth(this.enemyHealth);
        this.choosePlayerDamage(players);
        this.assignDamageIds(players);
        this.gameState + 1;
        console.log("good job me")
    },
    //runs at upon starting and at the end of each game after an additional click

    chooseEnemyHealth: function(arr){
        arr = Math.floor((Math.random() * 40) + 80);
        $("#waspHealth").text(arr);
        //i dont think i need to return be i might
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
            console.log($(".playerBee"+[i]).attr("id", damArr[i]));
    }},

    //may need a player damage reset.

    resetDamageDealt: function (arr){
        arr = 0;
        $("#damageScore").text(arr);
    },
    //resets the damage to 0 after each turn

    displayDamageDealt: function (arr){
        $("#damageScore").text(arr);
    },
    //will be called for at the end of each turn

    lossScreenVis: function(vis){
        $(".lossCard").css("visibility", vis)
    },
    //will manipulate the visibility of the loss screen at game end and reset

    winScreenVis: function(vis){
        $(".winCard").css("visibility", vis)
    },
    //will manipulate the visibility of the win screen at game end and reset

    checkGameOver: function(arr, event){
        if (arr > this.enemyHealth){
            //this function is designed for game.currentDamage to be fed in. this "if" checks for a loss by overshooting the target damage. If so, this runs.
            this.lossScreenVis("visible");
            //sets loss screen to visible
            this.losses++;
            //adds a loss
            $("#losses").text(this.losses);
            //updates losses displayed
            this.gameState-1;
            //resets gameState
        }else if(arr = this.enemyHealth){
            //checks for a win of matching damage to health
            this.winScreenVis("visible");
            //displays win screen
            this.wins++;
            //adds a win
            $(".wins").text(this.wins);
            //updates wins
            this.gameState-1;
            //resets gamestate
        }else{  
            this.gamePlay(event)
        }
        //if no win or loss, keep playing
    },

    gamePlay: function(){
       $(".playerBee").click(function(event){
           console.log("listening")
            var turnDamage = parseInt(event.target.id);
            game.currentDamage + turnDamage;
            displayDamageDealt(game.currentDamage);
       })
    }

}


if (game.gameState === 0 ){
    game.gameSetup()
}else{
    console.log("i'm working");
    $(document).ready(function(){
        $(".playerBee").click(checkGameOver(game.currentDamage, event));
    })
}