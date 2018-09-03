// Initial array of gifs
var gifs = [
  "dancing food",
  "funny animals",
  "stand up fails",
  "dad jokes",
  "cute cats",
  "llamas",
  "favorite cartoons"
];

function displayGif() {
  // constructing a queryURL variable we will use instead of the literal string inside of the ajax method
  var gif = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=PAHxaCpTlyPZHaybJOdnx8wPhTphyBTp&q=" +
    gif +
    "&limit=10&offset=0&rating=G&lang=en"; //basic string to create link
  //WORKS:
  // Creating an AJAX call for the specific gif button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Looping through the array of gifs
    for (var i = 0; i < gifs.length; i++) {
      // Then dynamicaly generating divs for each gif in the array.
      // This code $("<div>") is all jQuery needs to create the start and end tag. (<div></div>)
      var gifDiv = $("<div>");
      // Adding a class
      gifDiv.addClass("gif-div");
      // Providing the div's text with a value of the gif at index i
      gifDiv.text(gifs[i]);
      //   gifDiv.text(gifs[i].response);

      var dataArr = $(response.data);
      console.log(dataArr);
//WORKS
      for (x = 0; x < dataArr.length < 11; x++) {
        //TODO: Make this loop for all gifs in array
        var imgURL = response.data[x].images.original_still.url;

        var image = $("<img>").attr("src", imgURL);

        gifDiv.prepend(image);

        var rating = "<h4>Rating: " + response.data[x].rating + "</h4>";

        gifDiv.prepend(rating);

        //   $("#gif-div").append(gifDiv);
        $("#gif-view").prepend(gifDiv);
      }
    }
  });
}
// WORKS
// Function for displaying gif data
function renderButtons() {
  // Deleting the gif buttons prior to adding new gif buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#gif-button").empty();

  // Looping through the array of gifs
  for (var i = 0; i < gifs.length; i++) {
    // Then dynamicaly generating buttons for each gif in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var gifButton = $("<button>");
    // Adding a class
    gifButton.addClass("gif-button");
    // Adding a data-attribute with a value of the gif at index i
    gifButton.attr("data-name", gifs[i]);
    // Providing the button's text with a value of the gif at index i
    gifButton.text(gifs[i]);
    // Adding the button to the HTML
    $("#gif-button").append(gifButton);
  }
}

// This function handles events where one button is clicked
$("#add-gif").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var gif = $("#gif-input")
    .val()
    .trim();
  // The gif from the textbox is then added to our array
  gifs.push(gif);

  // calling renderButtons which handles the processing of our gif array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "gif-button"
$(document).on("click", ".gif-button", displayGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();
