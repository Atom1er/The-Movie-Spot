var header = $("#header");
var submit = $("#submit");
var UserName = $("#UserName");
var NewCategory = $("#NewCategory");
var mainContent = $("#mainContent");
var categories = $("#categories");
var error1 = $("#error1");
var error2 = $("#error2");
var name;
var test;


submit.on("click", function (event) {
    event.preventDefault();
    error1.css('display', 'none');
    error2.css('display', 'none');
    var Newkey = NewCategory.val().trim();
    name = UserName.val().trim();
    
    if (Newkey !== "" && Newkey !== test && name !== "") {
      search();

    } else if (Newkey === test || Newkey ==="" || name === "") {
        if(name === ""){
            error1.css('display', 'block');
            error1.text('Please enter a User name!');
        } else if(Newkey === test || Newkey === ""){
            error2.css('display', 'block');
            error2.text('Please enter a valid/different search word!');
        }
    }

});

//// {------Search engin for a specifique movie------}///////
$(document).on("click", ".NewButton", function () {
    $(".welcomSection").css('display', 'none');
    mainContent.css('display', 'block');

});

//// {--------Search engin API 1 & 2  SETTINGS ----}/////
function search(){
    var Newkey = NewCategory.val().trim();
    var newCat = $("<button>");
    newCat.attr('class', 'NewButton');

    // console.log(name, Newkey);
    newCat.append(Newkey);
    categories.append(newCat);

    var movieTitle = NewCategory.val().trim();
    var api1_key = "95f43ed4";
    var queryURL1 = "http://www.omdbapi.com/?t=" + movieTitle + "&apikey=" + api1_key;
    var api2_key= "e862ab4c2af4753ad517e279d0a0591a";
    var queryURL2 = "https://api.themoviedb.org/3/search/movie?query=" + movieTitle + "&api_key=" + api2_key;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": queryURL2,
        "method": "GET",
        "headers": {},
        "data": "{}"
    };

    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response) {


        console.log("API 1");
        console.log(response);

        $(".movieText").text(JSON.stringify(response));

        // console.log(response.Ratings);
        // console.log(response.Ratings[1]);

    });

    $.ajax(settings).done(function (response) {
        console.log("API 2"); 
        console.log(response);
        mainContent.css('display', 'block');
        ResultDisplay(response);
    });
    test = Newkey;

    $(".welcomSection").css('display', 'none');
    mainContent.css('display', 'block');
   
}


function ResultDisplay(resp){
    for(var i = 0; i<4; i++){
        var Maindiv = $("<div>");
        var img = $("<img>");
        // var overviewDiv = $("<div>");
        var titleDiv = $("<div>");
        Maindiv.attr('class', 'col-3 posterDiv');
        img.attr('class', 'poster');
        img.attr('src',"http://image.tmdb.org/t/p/w185//" + resp.results[i].poster_path);
        titleDiv.text(resp.results[i].title);
        // overviewDiv.text(resp.results[i].overview);
        Maindiv.append(img,titleDiv);
        mainContent.append(Maindiv);
    }
    
}