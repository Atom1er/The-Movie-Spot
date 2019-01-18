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
    localStorage.setItem('myName', name);
    
    if (Newkey !== "" && Newkey !== test && name !== "") {
    //   search();
      placeholder();
      buttonsHere(Newkey);
      newKeyword();
      AddKey();
      MoreDetail();

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
    var movieTitle = $(this).val().trim();
    console.log(movieTitle);
    // var api1_key = "95f43ed4";
    // var queryURL1 = "http://www.omdbapi.com/?t=" + movieTitle + "&apikey=" + api1_key;
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
// getting response from API
    $.ajax(settings).done(function (response) {
        console.log("API 2"); 
        console.log(response);
        mainContent.css('display', 'block');
        ResultDisplay(response);
    });
    // test = movieTitle;

    mainContent.css('display', 'block');
   
}

// this function generates buttons for the movies
function ResultDisplay(resp){
    $(".placeHolderDiv").empty();
    for(var i = 0; i<4; i++){
        var Maindiv = $("<div>");
        var img = $("<img>");
        // var overviewDiv = $("<div>");
        var titleBtn = $("<button>");
        titleBtn.addClass('titleBtn');
        titleBtn.val(resp.results[i].title);
        titleBtn.attr('id', resp.results[i].id);
        Maindiv.attr('class', 'col-3 posterDiv');
        img.attr('class', 'poster');
        img.attr('src',"http://image.tmdb.org/t/p/w185//" + resp.results[i].poster_path);
        titleBtn.text(resp.results[i].title);
        titleBtn.data('data-title', resp.results[i].title);

        titleBtn.data('data-poster', "http://image.tmdb.org/t/p/w185//" + resp.results[i].poster_path);
        titleBtn.data('data-overview', resp.results[i].overview);
        // overviewDiv.text(resp.results[i].overview);
        Maindiv.append(img,titleBtn);
        $(".placeHolderDiv").append(Maindiv);
    }
    
}

function placeholder(){
    // creating a div for place holder
    var pHolder = $("<div>");
    pHolder.addClass('jumbotron placeHolderDiv');
    $(".container").html(pHolder);
    

    // creating a second div for buttons
    var pHolder2 = $("<div>");
    pHolder2.addClass('col-12 buttonsDivs');
    pHolder2.attr('id', 'buttonSection');
    $(".container").append(pHolder2);
}

// creates buttons for the movies
function buttonsHere(value){
    var Newkey = NewCategory.val().trim();
    var newCat = $("<button>");
    newCat.val(value);
    newCat.attr('class', 'NewButton btn btn-lg');

    // console.log(name, Newkey);
    newCat.append(value);
    $("#buttonSection").append(newCat);
}

function newKeyword(){
    var keyWord = $("<form>");
    keyWord.addClass('form-inline');
    var userInput = $("<input>");
    userInput.addClass('form-control mr-sm-2 KeyAdd');
    var button2 = $("<button>");
    button2.text('Add Keyword');
    button2.addClass('btn btn-outline-success my-2 my-sm-0 AddKeyWord');
    keyWord.append(userInput, button2);
    var userFromStorage = localStorage.getItem("myName");
    var span = $("<span>");
    span.addClass('spanName');
    span.text(userFromStorage);
    $(".container").prepend(span, keyWord);
}

function AddKey(){
    $(document).on('click', '.AddKeyWord', function(event){
        event.preventDefault();
        var NewWord = $(".KeyAdd").val().trim();
        buttonsHere(NewWord);
    });
}

function MoreDetail(){
    $(document).on('click', '.titleBtn', function(event){
        event.preventDefault();
        var PickedMovie = $(this).val();
        var Maindiv = $("<div>");
        Maindiv.addClass('mainDivClass');
        var img = $("<img>");
        img.addClass('moreDetailsImg');
        var overviewDiv = $("<div>");
        overviewDiv.addClass('overviewClass');
        var titleBtn = $("<div>");
        titleBtn.addClass('titleOverview');
        img.attr('src', $(this).data("data-poster"));
        titleBtn.text($(this).data("data-title"));
        overviewDiv.text($(this).data("data-overview"));
        Maindiv.append(titleBtn, img, overviewDiv);
        $(".placeHolderDiv").empty();
        $(".placeHolderDiv").append(Maindiv);
});
}

$(document).on("click", ".NewButton", search);



