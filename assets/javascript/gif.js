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
    for (var i = 0; i < 11; i++) {
      // Then dynamicaly generating divs for each gif in the array.
      // This code $("<div>") is all jQuery needs to create the start and end tag. (<div></div>)
      var gifDiv = $("<div>");
      // Adding a class
      gifDiv.addClass("gif-div");
      // Providing the div's text with a value of the gif at index i
      // gifDiv.text(gifs[i]);//responsible for the data-name text next to image. edit gif-div class to format

      var imgURL = response.data[i].images.original_still.url;

      var still = $("<img>").attr("src", imgURL);

      gifDiv.prepend(still);

      var rating =
        "<h4><strong>Rating: " + response.data[i].rating + "</strong></h4>";

      gifDiv.prepend(rating);

      $("#gif-view").prepend(gifDiv);

      var animated = response.data[i].images.original.url;

      var giphy = $("<img>").attr("src", animated);

      var thisGif = $(this.giphy);
      console.log(thisGif);

    function moveGif() {

        $(this).removeClass("gif-div");

        $(this).addClass("gifMove");

        $(".gifMove").append(giphy);

        console.log(giphy);
      }
      // // This function handles events where gifdiv button is clicked
      $(document).on("click", moveGif);
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
  for (var x = 0; x < gifs.length; x++) {
    // Then dynamicaly generating buttons for each gif in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var gifButton = $("<button>");
    // Adding a class
    gifButton.addClass("gif-button");
    // Adding a data-attribute with a value of the gif at index i
    gifButton.attr("data-name", gifs[x]);
    // Providing the button's text with a value of the gif at index i
    gifButton.text(gifs[x]);
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
// Calling the renderButtons function to display the intial buttons
renderButtons();
// Adding a click event listener to all elements with a class of "gif-button"
$(document).on("click", ".gif-button", displayGif);
