


var KO_MODEL;
$(document).ready(function(){
	window.KO_MODEL = TailorMainModel({"gradeArray":JSONGRADEARRAY, "technology":JSONTECHDATA });
	ko.applyBindings(window.KO_MODEL);

});



// --------------------- Models ---------------------------------//
var Task = function(text){
	var self = this;
	self.name = text.name;
	self.url = text.url;
	self.technology =text.technology;
	self.grades = text.grades;
};

var TailorMainModel = function(data){
	var self = this;
	self.gradeArray = data.gradeArray;
	self.tech = data.technology;
	self.list = ko.observable();

	self.getTools = function(gradeValue, tech){
		self.list(new ListModel(data.tools));
	};

	self.gradeView = ko.observable(false);
	self.techView =  ko.observable(true);
	self.listView =  ko.observable(false);
};


var ListModel = function(data){
	var self= this;
	self.gridData= ko.observableArray($.map(data, function(text) {return new Task(text)}));
	self.filterData= ko.observableArray($.map(data, function(text) {return new Task(text)}));
	self.grades=[1,2,3,4,5,6,7,8,9,10,11,12];
	self.technology = ["Andriod", "Chomebook","iPads","Windows"];
	self.filters = ko.observableArray();
	$.ajax({
		dataType: "json",
		url: JSONFILEPATH_Filters,
		success: function(data){
			self.filters($.map(data, function(text){return new FilterGroups(text)}));
		},
		error: function(request, status, error){
			console.log('JSON file load unsuccessful', status, request, error);
		}
	});

	self.headers = [
		{ title: 'Name', sortPropertyName: 'name', asc: true },
		{ title: 'Url', sortPropertyName: 'url', asc: true },
		{ title: 'Technology', sortPropertyName: 'technology', asc: true },
		{ title: 'Grades', sortPropertyName: 'grades', asc: true }
	];

	self.sort = function (header, event) {
		var prop = header.sortPropertyName;
		var asc = header.asc;
		header.asc = !header.asc;
		var ascSort = function (a, b) { return a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0; };
		var descSort = function (a, b) { return ascSort(b, a); };
		var sortFunc = asc ? ascSort : descSort;
		self.filterData.sort(sortFunc);
	}

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