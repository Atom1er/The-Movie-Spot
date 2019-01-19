$(document).ready(function(){

    ////////////---Setting global variables /////
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
var counter = 1;
var searchKey = [];
var NewWordTest;

$("#video").on("click", function(){
    $("#video").hide();
    $(".container-fluid").show();
});

    if(localStorage.getItem('myName') == null){
        //////// --------- Home page
submit.on("click", function (event) {
    event.preventDefault();
    //--- Checking for valid Entry from User ---///
    error1.css('display', 'none');
    error2.css('display', 'none');
    var Newkey = NewCategory.val().trim();
    name = UserName.val().trim();
    localStorage.setItem('myName', name);

    /// ---> If User Entry are valid then Start Program --- ////
    if (Newkey !== "" && Newkey !== test && name !== "") {
        placeholder();
        buttonsHere(Newkey);
        newKeyword();
        AddKey();
        MoreDetail();
        $(document).on("click", ".NewButton", search);

    } 
    /// ---> If form are not fully file Show Error   --- ////
    else if (Newkey === test || Newkey === "" || name === "") {
        if (name === "") {
            error1.css('display', 'block');
            error1.text('Please enter a User name!');
        } else if (Newkey === test || Newkey === "") {
            error2.css('display', 'block');
            error2.text('Please enter a valid/different search word!');
        }
    }

});


    } else if(localStorage.getItem('myName') != null){
        placeholder();
        buttonsHere("it");
        newKeyword();
        AddKey();
        MoreDetail();
        $(document).on("click", ".NewButton", search);
    }



//// {------Search engine for a specifique movie------}///////
$(document).on("click", ".NewButton", function () {
    $(".welcomSection").css('display', 'none');
    mainContent.css('display', 'block');

});

//// {--------Search engine API 2  SETTINGS ----}/////
function search() {
    var movieTitle = $(this).val().trim();
    console.log(movieTitle);

    /// ---> API AUTH SET   --- ////
    
    var api2_key = "e862ab4c2af4753ad517e279d0a0591a";
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
        ResultDisplay(response, api2_key);
    });

    mainContent.css('display', 'block');

}

// this function generates buttons for the movies
function ResultDisplay(resp, apik) {
    $(".placeHolderDiv").empty();
    for (var i = 0; i < 4; i++) {
        
    /// ---> Creating HTML TAGS FOR RESULT DISPLAY   --- ////
    
        var Maindiv = $("<div>");
        var img = $("<img>");
        var titleBtn = $("<button>");
        titleBtn.addClass('titleBtn');
        titleBtn.val(resp.results[i].title);
        titleBtn.attr('id', resp.results[i].id);
        Maindiv.attr('class', 'col-3 posterDiv');
        img.attr('class', 'poster');
        img.attr('src', "https://image.tmdb.org/t/p/w185//" + resp.results[i].poster_path);
        titleBtn.text(resp.results[i].title);

        /// ---> Saving every single movie infos into his Button --- ///
        titleBtn.data('data-trailer', 'https://api.themoviedb.org/3/movie/' + resp.results[i].id + '/videos?api_key=' + apik);
        titleBtn.data('data-title', resp.results[i].title);
        titleBtn.data('data-poster', "https://image.tmdb.org/t/p/w185//" + resp.results[i].poster_path);
        titleBtn.data('data-overview', resp.results[i].overview);

        /// ---> appending Result into placeHolder
        Maindiv.append(img, titleBtn);
        $(".placeHolderDiv").append(Maindiv);
    }

}

function placeholder() {
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
function buttonsHere(value) {
    var Newkey = NewCategory.val().trim();
    var newCat = $("<button>");
    newCat.val(value);
    newCat.attr('class', 'NewButton btn btn-lg');

    // console.log(name, Newkey);
    newCat.append(value);
    $("#buttonSection").append(newCat);
}

function newKeyword() {

    var keyWord = $("<form>");
    keyWord.addClass('form-inline');
    var userInput = $("<input>");
    userInput.addClass('form-control mr-sm-2 KeyAdd');
    var button2 = $("<button>");
    button2.text('Search Movie');
    button2.addClass('btn btn-outline-success my-2 my-sm-0 AddKeyWord');
    keyWord.append(userInput, button2);
    var userFromStorage = localStorage.getItem("myName");
    var span = $("<span>");
    span.addClass('spanName');
    span.text("Welcome, " + userFromStorage);
    $(".container").prepend(span, keyWord);
}

function AddKey() {
    $(document).on('click', '.AddKeyWord', function (event) {
        event.preventDefault();
        var NewWord = $(".KeyAdd").val().trim();
        
        if (NewWord !== NewWordTest && NewWord !== ""){
            searchKey.push(NewWord);
            JSON.stringify(localStorage.setItem("Key_word", searchKey));
            console.log(localStorage.getItem("Key_word"));
            buttonsHere(NewWord);
            NewWordTest = NewWord;
        }
    });
}

function MoreDetail() {
    $(document).on('click', '.titleBtn', function (event) {
        event.preventDefault();
        // var PickedMovie = $(this).val();
        var Maindiv = $("<div>");
        Maindiv.addClass('row');
        var titleBtn = $("<div>");
        titleBtn.addClass('titleOverview row');
        var TrailerOverviewDiv = $("<div>");
        TrailerOverviewDiv.addClass('col-7');
        var img = $("<img>");
        img.addClass('moreDetailsImg col-5');
        var overviewDiv = $("<div>");
        overviewDiv.addClass('overviewClass row');

        //////// ----------> Getting Video Trailer Using AJAX <--------///////////////

        //API SETTING
        
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": $(this).data("data-trailer"),
            "method": "GET",
            "headers": {},
            "data": "{}"
        };

        // getting response from API //
        var link;
        var video;
        $.ajax(settings).done(function (response) {
            console.log("API trailerTest");
            console.log(response);
            link = "https://www.youtube.com/embed/" + response.results[0].key + "?autoplay=1";

            $(".Trailer").attr('src', link);
        });

        /////// -----------> END AJAX REQUEST <------------/////////////////////
            
        video = $('<iframe />', {
            class: 'Trailer row',
            src: link,
        });



        img.attr('src', $(this).data("data-poster"));
        titleBtn.text($(this).data("data-title"));
        overviewDiv.text($(this).data("data-overview"));
        TrailerOverviewDiv.append(video, overviewDiv);
        Maindiv.append(titleBtn,TrailerOverviewDiv, img);
        // TrailerSetting($(this).data("data-trailer"));
        $(".placeHolderDiv").empty();
        $(".placeHolderDiv").append(Maindiv);
    });
}






});