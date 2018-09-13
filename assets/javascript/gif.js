// Initial array of gifs
var gifs = [
  "Aziz Ansari",
  "Louis C.K.",
  "Kevin Hart",
  "Chris Rock",
  "Jerry Seinfeld",
  "Dave Chappelle",
  "Amy Schumer",
  "Eddie Murphy",
  "Joe Rogan",
  "Sarah Silverman",
  "Robin Williams",
  "Sacha Baron Cohen",
  "Bill Cosby",
  "Ricky Gervais",
  "Jim Gaffigan",
  "Norm Macdonald",
  "Adam Sandler",
  "Conan O'Brien",
  "Jon Stewart",
  "Bill Murray",
  "John Mulaney",
  "Steve Martin",
  "Bill Burr",
  "Amy Poehler",
  "Jim Carrey",
  "Seth Rogen",
  "Bernie Mac"
];

function displayGif() {
  // constructing a queryURL variable we will use instead of the literal string inside of the ajax method
  var gif = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=PAHxaCpTlyPZHaybJOdnx8wPhTphyBTp&q=" +
    gif +
    "&limit=10&offset=0&rating=PG&lang=en"; //basic string to create link
  //WORKS:
  // Creating an AJAX call for the specific gif button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var resultingGifs = response.data;
    // Looping through the array of gifs
    for (var i = 0; i < resultingGifs.length; i++) {
      // Then dynamicaly generating divs for each gif in the array.
      // This code $("<div>") is all jQuery needs to create the start and end tag. (<div></div>)
      var gifDiv = $("<div>");

      // Adding a class to the div
      gifDiv.addClass("gif-div");
      // gifDiv.attr("data-state", "still");

      // define variable equal to the still photo
      var still = resultingGifs[i].images.original_still.url;
      console.log(still);
      console.log(resultingGifs);

      // set variable equal to image gif from api
      var gifImage = $("<img>").attr("src", still);

      gifImage.attr("data-state", "still");
      gifImage.attr("data-still", still);
      $("data-still").text("src", still);

      // gifImage.attr("data-animate", "src", resultingGifs[i].images.original.url);

      console.log(gifImage);
      // append still image to gif div
      // gifDiv.prepend(gifImage);

      // set rating equal to divs rating value
      var rating =
        "<h5><strong>Rating: " + resultingGifs[i].rating + "</strong></h5>";

      // append it to the gif div view
      gifDiv.prepend(rating);

      // append the gif div to the gif view section in html
      $(gifDiv).append(gifImage);
      $("#gif-view").prepend(gifDiv);

      var animated = resultingGifs[i].images.original.url;

      console.log(animated);

      gifImage.addClass("gifImage");
      gifImage.attr("data-animate", animated);
      $("data-animate").text("src", animated);


      // when user clicks on a gif div, run this function
      $(gifImage).on("click", function(event) {
        event.preventDefault();
        // define variable equal to the animated gif
        // set state variable equal to the data state attribute for that image
        var state = $(this).attr("data-state");
        // gifActive.addClass("da")
        // if the state is equal to still, then set its attribute to animate and also its state from still to animate
        // otherwise if state is already equal to animate, set the source to still and data state as well
        // $(this).on
        if (state == "still") {
          // set variable equal to animated gif
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");

        } else if (state == "animate") {

          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    }
  });
}
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
