//GifTastic Logic

console.log("linked");

var games = ["Metroid", "Mario", "Asteroids", "Galaga"];

function displayGifs() {
	var game = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=dc6zaTOxFJmzC&rating=pg&limit=10";
	var testURL = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC";
	
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		test = response;
			
		for(var i = 0;i < 10; i++) {
			var gameDiv = $("<div class='gameDiv'>");

			var gifRating = response.data[i].rating;

			var pOne = $("<p>").text("Rating: " + gifRating);

			gameDiv.append(pOne);

			var imgURL = response.data[i].images.fixed_height_still.url;

			var gifURL = response.data[i].images.fixed_height.url;

			var gif = $("<img>")
				.addClass("gifImage")
				.attr("src", imgURL)
				.attr("data-still", imgURL)
				.attr("data-animate", gifURL)
				.attr("data-state", "still");

			gameDiv.append(gif);
			
			$("#gaming-gifs").prepend(gameDiv);
			
		}

		$(".gifImage").on("click", function(){
			var dataState = $(this).attr("data-state");
			console.log(dataState);

			if(dataState === "still") {
				$(this).attr("src", $(this).attr("data-animate"));
				$(this).attr("data-state", "animate");
			
			} else if (dataState === "animate") {
				$(this).attr("src", $(this).attr("data-still"));
				$(this).attr("data-state", "still");
			}
		});

		
	});

}

function renderButtons() {
	$("#button-location").empty();

	// Looping through the array of games
        for (var i = 0; i < games.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("game");
          // Adding a data-attribute
          a.attr("data-name", games[i]);
          // Providing the initial button text
          a.text(games[i]);
          // Adding the button to the buttons-view div
          $("#button-location").append(a);
        }
}

$("#add-game").on("click", function(event) {
	event.preventDefault();

	var game = $("#gaming-input").val().trim();

	games.push(game);

	renderButtons();

});

$(document).on("click", ".game", displayGifs);









renderButtons();









