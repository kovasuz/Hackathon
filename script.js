// word unscrambler
var word;
var guess;
var definiton;
var redo = 0;

$(document).ready(function () {
  getWord();
});

//picks the word
function getWord() {
  //put "looking for word gif" here
  $("#newGame").hide();
  $("#loadingDefinition").hide();
  $("#definitionPlace").empty();
  $("#rightorwrong").empty();
  $("#letters").hide();
  $("#wordDisclaimer").hide();
  $("#word").empty();
  $("#guess").val("")
  $.ajax({
    url: 'https://random-word-api.herokuapp.com/word?number=1&swear=0',
    dataType: "json",
    success: getDefinition
  });
}

//retrieves the definitions of the word
function getDefinition(data) {
  //put "looking for definition" gif here

  $("#loadingWord").hide()
  $("#loadingDefinition").show()
  word = data[0];
  console.log(word)
  $.ajax({
    url: 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word,
    dataType: "json",
    success: check,
    statusCode: {
      404: function (xhr) {
        if (window.console) console.log(xhr.responseText);
        getWord()
      }
    }
  });
}

function check(data) {
  //displays definition
  // if (data[0].meanings[0].definitions.length >= 1) {

  // }

  for (var i = 0; i < data[0].meanings.length; i++) {
    for (var l = 0; l < data[0].meanings[i].definitions.length; l++) {
      $("#definitionPlace").append(data[0].meanings[i].partOfSpeech + ": " + "<div>")
      $("#definitionPlace").append(data[0].meanings[i].definitions[l].definition + "<div>" + "<div>");
    }
  }
  $("#letters").show();
  scrambleLetters();
  $("#loading").hide();
  $("#loadingDefinition").hide();
  $("#defNum").html(data[0].meanings[0].definitions.length)
  $("#newGame").show();
  //resets the game
  // scrambleLetters()
}


function checkWord() {
  guess1 = $("#guess").val();
  guess = guess1.toLowerCase();
  if (guess == word) {
    $("#loading").hide();
    $("#rightorwrong").html("You got it! The word was " + word + ".");
    $("#newGame").show()
  }
  else if (guess != word) {
    $("#loading").hide();
    $("#rightorwrong").html("Guess again.");
  }
}

function showAnswer() {
  $("#word").html(word)
  $("#wordDisclaimer").show();
}


function scrambleLetters() {
  //var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var letters = word;
    for (var i = 0; i < letters.length; i++) {
      var move = letters[i]
      var temp1 = Math.random();
      //var temp = Math.floor(Math.random() * (26) + 0);
      if (temp1 < 0.5) {
        letters += move;
        letters = letters.substring(0, i) + letters.substring (i+1, letters.length);
      }
    }
  $("#letters").html(letters);

}
