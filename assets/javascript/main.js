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


