function animateOrStill() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
}

// Submit button grabs the user text
function createGifs(event){
    $("#gif-dump").empty();

    var userInput = $(this).attr("userInput");

    event.preventDefault();

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userInput + "&api_key=IdkeuTs2YRIxYEwZf4JFp3cOutCwirWR&limit=10&rating=g";

    $.ajax ({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        for (var i = 0; i < response.data.length; i++) {
            var imageUrl = response.data[i].images.fixed_height_small.url;
            var rating = response.data[i].rating;
            var imageStill = response.data[i].images.fixed_height_small_still.url;

            // Create image
            var gifImage = $("<img>");
            gifImage.attr("src", imageStill);
            gifImage.attr("alt", "gif images");

            // Store images to be still and animate, 
            gifImage.attr("data-state", "still");
            gifImage.attr("data-animate", imageUrl);
            gifImage.attr("data-still", imageStill);

            // Create Rating 
            var ratingSpan = $("<span>");
            ratingSpan.text("Rating: " + rating);

            // Create parent div
            var parentSpan = $("<span>");
            parentSpan.append(ratingSpan);
            parentSpan.append(gifImage);

            $("#gif-dump").prepend(parentSpan);

            gifImage.on("click", animateOrStill);
        }
    })


}

$(document).ready(function() {
    // Executes when submit button is clicked
    $("#submit-button").on("click", function(){
        var userInput = $("#animal-text").val().trim();

        var renderButton = $("<button>" + userInput + "</button>");
        renderButton.attr("userInput", userInput);
        
        $("#button-dump").append(renderButton);
        renderButton.on("click", createGifs);
    })

}); 


