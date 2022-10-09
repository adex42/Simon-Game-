var button_colours = ["red", "blue", "green", "yellow"];
var game_pattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(document).keypress(function () {
    if (!started) {
        $("#level-title").html("Level " + level);
        nextSequence();
        started = true;
    }
});
$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    play_audio(userChosenColour);
    blink(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").html("Level " + level);
    random_number = Math.floor(Math.random() * 4);
    random_color = button_colours[random_number];
    game_pattern.push(random_color);
    blink(random_color);
    play_audio(random_color);
}
function checkAnswer(currentLevel) {
    if(game_pattern[currentLevel]===userClickedPattern[currentLevel])
    {
        if (userClickedPattern.length === game_pattern.length) 
        {
          setTimeout(() => {
            nextSequence();
          }, 1000);  
        }
    }
    else
    {
        play_audio("wrong");
        $("#level-title").text("Game over , press any key to restart");
        startOver();
    }
}
function blink(random_color) {
    $("#" + random_color).fadeOut(100).fadeIn(100);
}

function play_audio(random_color) {
    var audio = new Audio("./sounds/" + random_color + ".mp3");
    audio.play();
}
function startOver()
{
    level = 0 ;
    game_pattern = [];
    started = false;
}