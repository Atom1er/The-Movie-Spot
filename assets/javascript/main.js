
$(".sendButton").on("click", function(event){

event.preventDefault();

var movieTitle = $(".movie-input").val();
var queryURL = "http://www.omdbapi.com/?t=" + movieTitle + "&apikey=95f43ed4"
// var queryURL = "https://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=95f43ed4";
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){

    console.log(response);

    $(".movieText").text(JSON.stringify(response));

    console.log(response.Ratings);
    console.log(response.Ratings[1]);

});

});

// 95f43ed4
// http://www.omdbapi.com/?apikey=[yourkey]&

// http://www.omdbapi.com/?t=taken