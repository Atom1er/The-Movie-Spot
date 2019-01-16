<<<<<<< HEAD

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
=======
var header = $("#header");
var submit = $("#submit");
var UserName = $("#UserName");
var NewCategory = $("#NewCategory");
var mainContent = $("#mainContent");
var categories = $("#categories");
var name;

submit.on('click', function(){
    var newCat = $("<div>");
    newCat.attr('class', 'NewButton');
    name = UserName.val().trim();
    var Newkey = NewCategory.val().trim();
    // console.log(name, Newkey);
    newCat.append(Newkey);
    categories.append(newCat);
});


>>>>>>> 441dca96a98fd96d35d45e73cc1155c85f41d5a0
