var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;

var started = false;

$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

});


function nextsequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  randomNumber = (Math.floor(Math.random() * 4));
  var randomChosenColour;
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");

  audio.play();
}

$(document).on("keydown", function() {

  if (!started) {
    $("#level-title").text("Level " + level);
    nextsequence();
    started = true;
  }


});




function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}
function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextsequence()
      }, 1000);
    }
  } else {
    console.log("wrong");
    var name="wrong";
    playSound(name);
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
  }

}
