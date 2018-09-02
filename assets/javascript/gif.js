// Initial array of gifs
var gifs = ["Lebron James", "Mike Tyson", "Andre 3000", "Mutombo Finger Wave"];

function displayGif() {
  // constructing a queryURL variable we will use instead of the literal string inside of the ajax method
  var gif = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=PAHxaCpTlyPZHaybJOdnx8wPhTphyBTp&q=" + gif + "&limit=25&offset=0&rating=G&lang=en"; //basic string to create link
//TODO:
  // Creating an AJAX call for the specific gif button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Creating a div to hold the gif
    var gifDiv = $("<div class='gif'>");
// for (var i = 0; i < )

    // Retrieving the URL for the image
    var imgURL = response.data[0].images.original.url;

    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);

    // Appending the image
    gifDiv.append(image);
    console.log(response);
    console.log(response.data[0].type);
    // $("#gif-view").prepend(response.data[0].type);
    // $("#gif-view").prepend(response.data[0].url);
    // Putting the entire gif above the previous gif
    $("#gif-view").prepend(gifDiv);
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
