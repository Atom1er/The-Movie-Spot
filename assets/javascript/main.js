$(document).ready(function () {

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

    // a timer is set if user does not click that next(Ry)
    setInterval(function () {
        $("#video").fadeOut(2000);
        $(".h1click").text("ENJOY");
        $(".container-fluid").show();
    }, 12000);
    // if user clicks video will fade and text will turn to ENJOY than next (Ry)
    $("#video").on("click", function () {
        $("#video").fadeOut(2000);
        $(".h1click").text("Enjoy!");
        $(".container-fluid").show();
    });


    $("#video").on("click", function () {
        $("#video").hide();
        $(".container-fluid").show();
    });

    if (localStorage.getItem('myName') == null) {
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
                SlideShow();
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


    } else if (localStorage.getItem('myName') != null) {
        placeholder();
        SlideShow();
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

    function SlideShow() {
        var slideTags = '<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" width="1200px" "height=600px">';
        slideTags += '<ol class="carousel-indicators">';
        slideTags += '<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>';
        slideTags += '<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>';
        slideTags += '<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>';
        slideTags += ' </ol>';
        slideTags += '<div class="carousel-inner">';

        slideTags += '<div class="carousel-item active">';
        slideTags += '<img width="1200px" "height=600px" src="./assets//image/1.jpg" class="d-block w-100" alt="...">';
        slideTags += '<div class="carousel-caption d-none d-md-block">';
        slideTags += '<h5 class="SlideShowText">Justice League</h5>';
        slideTags += '<div class="SlideShowText">ustice League is a 2017 American superhero film based on the DC Comics superhero</div>';
        slideTags += '</div>';
        slideTags += '</div>';
        slideTags += '<div class="carousel-item">';
        slideTags += '<img width="1200px" "height=600px" src="./assets//image/2.jpg" class="d-block w-100" alt="...">';
        slideTags += '<div class="carousel-caption d-none d-md-block">';
        slideTags += '<h5 class="SlideShowText">FNAF Movie</h5>';
        slideTags += '<div class="SlideShowText" >Five Nights at Freddy (often abbreviated to FNaF) is a media franchise based around an indie video game series created, designed, developed, and published by Scott Cawthon for Microsoft Windows</div>';
        slideTags += '</div>';
        slideTags += '</div>';
        slideTags += '<div class="carousel-item">';
        slideTags += '<img width="1200px" "height=600px" src="./assets/image/3.jpg" class="d-block w-100" alt="...">';
        slideTags += '<div class="carousel-caption d-none d-md-block">';
        slideTags += '<h5 class="SlideShowText">The Expendables 4</h5>';
        slideTags += '<div class="SlideShowText">The Expendables is an American series of ensemble action films written by and starring Sylvester Stallone and originally created by David Callaham.</div>';
        slideTags += '</div>';
        slideTags += '</div>';
        slideTags += '<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">';
        slideTags += '<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
        slideTags += '<span class="sr-only">Previous</span>';
        slideTags += '</a>';
        slideTags += '<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">';
        slideTags += '<span class="carousel-control-next-icon" aria-hidden="true"></span>';
        slideTags += '<span class="sr-only">Next</span>';
        slideTags += '</a>';
        slideTags += '</div>';
        $(".placeHolderDiv").html(slideTags);

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

            if (NewWord !== NewWordTest && NewWord !== "") {
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


            // getting response from API //


            var BtnTrailer = $("<button>");
            BtnTrailer.addClass('BtnTrailer');
            BtnTrailer.text('Watch Trailer');
            BtnTrailer.data('data-trailer', $(this).data("data-trailer"));
            // console.log(BtnTrailer);


            img.attr('src', $(this).data("data-poster"));
            titleBtn.text($(this).data("data-title"));
            overviewDiv.text($(this).data("data-overview"));
            TrailerOverviewDiv.append(BtnTrailer, overviewDiv);
            Maindiv.append(titleBtn, TrailerOverviewDiv, img);
            // TrailerSetting($(this).data("data-trailer"));
            $(".placeHolderDiv").empty();
            $(".placeHolderDiv").append(Maindiv);


        });





    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    $(document).on('click', '.BtnTrailer', PlayTrailer);

    function PlayTrailer() {


        var settings = {
            "async": true,
            "crossDomain": true,
            "url": $(this).data("data-trailer"),
            "method": "GET",
            "headers": {},
            "data": "{}"
        };


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



        // var div = $("<div>");
        // var id = "";
        // div.addClass('modal-body Trailer');
        // div.append(video);
        modalString = "";
        modalString += "<div class='modal fade' id='exampleModalCenter' tabindex='-1' role='dialog' aria-labelledby='exampleModalCenterTitle' aria-hidden='true'>";
        modalString += "<div class='modal-dialog modal-dialog-centered' role='document'>";
        // modalString += "<div class='modal-header'>";
        modalString += "<div class='modal-content'>";
        modalString += "</div>";
        modalString += "</div>";
        modalString += "</div>";
        // modalString += "</div>";
        $('.modal-content').empty();
        $('.modal-content').append(video);
        $('#exampleModalCenter').modal("show");
        $('.placeHolderDiv').append(modalString);
    }

    //
    // 
    // modalString += "<h5 class='modal-title' id='exampleModalCenterTitle'>Modal title</h5>";
    // modalString += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
    // modalString += "<span aria-hidden='true'>&times;</span>";
    // modalString += "</button>";
    // modalString += "</div>";
    // modalString += "<div class='modal-body'>";
    // modalString += "...";
    // modalString += "</div>";
    // modalString += "<div class='modal-footer'>";
    // modalString += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>";
    // modalString += "<button type='button' class='btn btn-primary'>Save changes</button>";

});