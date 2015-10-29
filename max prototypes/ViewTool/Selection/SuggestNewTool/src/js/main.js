


window.KO_MODEL;
$(document).ready(function(){
	var KO_MODEL = SuggestToolsMain({"filters": [
														{
															"name":"Grades",
															"options":JSONGRADEARRAY
														},
														{
															"name":"Technology",
															"options":JSONTECHDATA
														}
													]

	});


	ko.applyBindings(KO_MODEL);

});



// --------------------- Models ---------------------------------//


var TagsWithHeadingArray = function(data){
	var self = this;
	var name = data.name;
	var optionsArray = ko.observableArray(data.options);
};

var SuggestToolsMain = function(data){
	var self = this;
	var selectedTagsArray = ko.observableArray([]);
	var remainingTagsArray = ko.observableArray($.map(data.filters, function(text) {return new TagsWithHeadingArray(text)}));
};





/**--------------SAMPLE DATA-------------------**/
var JSONGRADEARRAY =[
	{
		"name": "Kindergarten",
		"value": 0
	},
	{
		"name": 1,
		"value": 1
	},
	{
		"name": 2,
		"value": 2
	},
	{
		"name": 3,
		"value": 3
	},
	{
		"name": 4,
		"value": 4
	},
	{
		"name": 5,
		"value": 5
	},
	{
		"name": 6,
		"value": 6
	},
	{
		"name": 7,
		"value": 7
	},
	{
		"name": 8,
		"value": 8
	}
];

var JSONTECHDATA = [
	{
		"name": "Windows Computers",
		"imgPath": "../img/windows.jpg",
		"value": "windows"
	},
	{
		"name": "Chromebooks",
		"imgPath": "../img/chromebook.jpg",
		"value": "Chromebooks"
	},
	{
		"name": "Android Tablets",
		"imgPath": "../img/android.jpg",
		"value": "Android"
	},
	{
		"name": "iPads",
		"imgPath": "../img/iPad.jpg",
		"value": "iPad"
	}
];