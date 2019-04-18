
const keyword = ["cat", "dog", "turtle", "lion"];

function displayGif() {

    let gif = $(this).attr("data-name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        const results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
            // Only taking action if the photo has an appropriate rating
            // if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div for the gif
            const gifDiv = $(`<div class=${"imgGif"}>`);

            // Storing the result item's rating
            const rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            const paragraph = $("<p>").text(`Rating: ${rating}`);

            // Creating an image tag
            const gifImage = $("<img>");
            
            // Creating space between img
            const spacing = $("<br>");
            
            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            gifImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and gifImage we created to the "gifDiv" div we created
            gifDiv.append(paragraph);
            gifDiv.append(spacing);
            gifDiv.append(gifImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gif").prepend(gifDiv);
            //   }
        }
    });

}

// Function for displaying gif data
function renderButtons() {

    // Deleting the keyword prior to adding new keyword
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of keyword
    for (var i = 0; i < keyword.length; i++) {

        // Then dynamicaly generating buttons for each gif in the array
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("movie-btn");
        // Adding a data-attribute
        a.attr("data-name", keyword[i]);
        // Providing the initial button text
        a.text(keyword[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a button is clicked
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gifphy = $("#gif-input").val().trim();

    // Adding movie from the textbox to our array
    keyword.push(gifphy);

    // Calling renderButtons which handles the processing of our array
    renderButtons();
});

// Adding a click event listener to all elements 
$(document).on("click", ".movie-btn", displayGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();

//plan to add additonal features
//Track how many times I have clicked 
//Write a function that multiplies  
//Built in api query string 'offset' 
//Html tag that has download 
//Built into the anchor tag 
//Google html anchor download 
//possibly store data into local storage or session storage instead.