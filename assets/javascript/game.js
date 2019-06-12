topics = ["Matrix", "Notebook", "Nobody", "King"];

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {

      
      var a = $("<button>");
      a.addClass("booger");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#buttons-view").append(a);

      console.log(a);
    }
};

$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    topics.push(gif);
    renderButtons();
  });

  //   $(".booger").on("click", function(event) {
      
      // event.preventDefault();
      function displayGifs() {
        event.preventDefault(); 
          // In this case, the "this" keyword refers to the button that was clicked
          var name = $(this).attr("data-name");
          // Constructing a URL to search Giphy for the name of the person who said the quote
          var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          name + "&api_key=Rjkdzu8N1yMfSmMDM910s9W4MxyOK3kX&limit=10";
        //   alert(queryURL);
          // Performing our AJAX GET request
          $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function(response) {
                // alert("bob");
                // Storing an array of results in the results variable
        var results = response.data;
        console.log(results);
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {
            
            // Creating a div for the gif
            var gifDiv = $("<div>");
            
            // Storing the result item's rating
            var rating = results[i].rating;
            
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);
            var animateLink = results[i].images.fixed_height.url;
            var stopLink = results[i].images.fixed_height_still.url;
            // Creating an image tag
            var personImage = $('<img class="still" moveMe="' + animateLink + '" stopMe="' + stopLink + '">');
            
            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            personImage.attr("src", results[i].images.fixed_height_still.url);
            
            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(personImage);
            gifDiv.append(p);
            
            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").append(gifDiv);
            
        }
        $(document).on("click", ".still", animateGif);

    });
    // });
}

function animateGif() {
var stillLink = $(this).attr("stopMe");
var moveLink = $(this).attr("moveMe");
$(this).html(moveLink);

// var newLink = $('<img class="still" moveMe="' + stillLink + '"> + moveLink');
console.log("still:" + stillLink);


console.log("move:" + moveLink);
// console.log("new:" + newLink);

}




$(document).on("click", ".booger", displayGifs);

renderButtons();