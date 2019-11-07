var APIkey = "i01XoCIYhnMHxK2IKfZO9EExqwyrqgDm"

//array topics
topics = ['Futurama', 'Star Wars', 'Cats', 'Marvel', 'Spiderman', 'Bernie'];

function displayGiphyInfo() {

    // button clicked = "this"
    var name = $(this).attr('data-name');

    //Giphy URL Search
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIkey + "&q=" + name + "&limit=10&offset=0&lang=en";

    // AJAX request
    $.ajax ({
        url: queryURL,
        method: "GET"
    })
        // API data comes in
        .then(function(response) {
            console.log(response);

            //big div to store all gif tiles with rating
            var giphyDiv = $('<div class = "giphy">'); 

            //storing an array of results in the results variable
            var results = response.data;

            // for loop for every item
            for (var i = 0; i < results.length; i++) {
                
                //placing gif and p in their own divs
                var subGiphyDiv = $('<div class = "subGiphy">'); 

                //storing the result item's rating
                var rating = results[i].rating;
                
                // grabable rating in p tag
                var p = $('<p>').text('Rating: ' + rating);
    
                // create image tag
                var topicImage = $('<img>');
    
                //Giving the image tag a src attribute of a property pulled from results
                //add attributes for all data - coulnt quite figure out pausing on gif but mostly there
                topicImage.attr({'src': results[i].images.fixed_height_still.url, 'data-still': results[i].images.fixed_height_still.url, 'data-animate': results[i].images.fixed_height.url, 'data-state': 'still', 'class':'gif'});
               
                // appending p tag and image to individual sub divs to make styling easier
                subGiphyDiv.append(topicImage,p);


                giphyDiv.append(subGiphyDiv);
    
                $('.giphy-results').prepend(giphyDiv); 
             };
            clicky();
        })
    };
    
   function clicky(){ 
    $('.gif').on('click', function() {
        var state = $(this).attr('data-state');
        if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    });
}
   
    // function for displaying topics data
    function renderButtons() {

    // Deleting the topics buttons prior to adding new topics buttons
    // (this step is necessary otherwise we will have repeat buttons)
    $('.buttons').empty();


//loop that creates buttons from the likesArray 
for (var i = 0; i < topics.length; i++){
    //generate buttons for each topic in the array
    var a = $('<button>')

    //add a class
    a.addClass('topic btn btn-info');

    //add a data-attribute with value at i in topics
    a.attr('data-name', topics[i]);

    //text for button
    a.text(topics[i]);

    //adding the button to the html
    $('.buttons').append(a);
    }
}

// Event listener for buttons
$('button').on('click', function() {
    event.preventDefault();

    //grabs text from input box
    var giphyInput = $('#giphy-search').val().trim();

    //the text from the box is then added to our array
    topics.push(giphyInput);
    renderButtons();
});            
            
  $(document).on('click', '.topic', displayGiphyInfo);          
            
renderButtons();

    
    
    
    
    
    
    

    
    




