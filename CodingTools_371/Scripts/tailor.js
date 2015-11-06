


var KO_MODEL;
$(document).ready(function () {
    //window.KO_MODEL = TailorMainModel({ "gradeArray": JSONGRADEARRAY, "technology": JSONTECHDATA, "toolList": JSONLISTDATA });
    //ko.applyBindings(window.KO_MODEL);

    $.ajax({
        url: 'GetToolList',
        type: 'GET',
        dataType:'JSON',
        success: function(data) {
            console.log(data);
            window.KO_MODEL = TailorMainModel(data);
            ko.applyBindings(window.KO_MODEL);
        },
        error: function(request, status, error) {
            console.log('failed get', request, status, error);
        }
    });
});



// --------------------- Models ---------------------------------//
var Task = function (text) {
    var self = this;
    self.name = text.Name;
    self.url = text.Url;
    self.Description = text.Description;
    self.technology = ko.observableArray([]);
    self.grades = ko.observableArray([]);
    self.displayTechnology = ko.observableArray([]);
    self.displayGrades = ko.observableArray([]);

    self.SetFilterOptions = function(data)
    {
        for (var i = 0; i < data.length; i++)
        {
            if (data[i]['CategoryName'] === 'Technology') {
                self.technology(data[i]['Tags']);
                self.displayTechnology($.map(data[i]['Tags'], function (text) { return ' ' + text['TagName'] }));
            }
            if (data[i]['CategoryName'] === 'Grades') {
                self.grades(data[i]['Tags']);
                self.displayGrades($.map(data[i]['Tags'], function(text) { return ' ' + text['TagName'] }));
            }
        }
    }
    


    self.SetFilterOptions(text.Tags);

};

var FilterOption = function (data, parent) {
    var self = this;
    self.father = parent;
    self.id = data.TagId;
    self.name = data.Name;
    self.imgPath = data.ImgPath == null ? '' : data.ImgPath; //only valid for tech
    self.value = data.Value;
    self.html = '<input type="checkbox" value="' + self.value + '" data-bind>' + self.name;
    self.selectedValue = ko.observable(false);

    self.tailorAdvanceClick= function() {
        self.selectedValue(true);
        self.father.tailorAdvanceClick();
    }

    self.selected = ko.computed({
        read: function() {
            return self.selectedValue();
        },
        write: function(newvalue) {
            self.selectedValue(!self.selectedValue());
            self.father.applyFilter();
        }
    });
}


var TailorMainModel = function (data) {
    var self = this;
    self.gradeView = ko.observable(false);
    self.techView = ko.observable(false);
    self.listView = ko.observable(false);
   // self.gradeArray = ko.observableArray($.map(data.gradeArray, function (text) { return new FilterOption(text,self) }));
   // self.tech = ko.observableArray($.map(data.technology, function (text) { return new FilterOption(text, self) }));
    self.gradeArray = ko.observableArray([]);
    self.tech = ko.observableArray([]);
    self.codeTypeArray = ko.observableArray([]);
    self.listGridData = ko.observableArray($.map(data.ToolList, function (text) { return new Task(text) }));
    self.listFilterData = ko.observableArray($.map(data.ToolList, function (text) { return new Task(text) }));

    self.SetFilterOptions = function (data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i]['CategoryName'] === 'Technology') {
                self.tech($.map(data[i]['Tags'], function (text) { return new FilterOption(text, self) }));
            }
            if (data[i]['CategoryName'] === 'Grades') {
                self.gradeArray($.map(data[i]['Tags'], function (text) { return new FilterOption(text, self) }));
            }
            if (data[i]['CategoryName'] === 'Code Type') {
                self.codeTypeArray($.map(data[i]['Tags'], function (text) { return new FilterOption(text, self) }));
            }
        }
    }
    self.SetFilterOptions(data.TagList);

    self.tailorAdvanceClick = function() {
        if (self.gradeView()) {
            self.gradeView(false);
            self.techView(true);
        } else {
            self.techView(false);
            self.listView(true);
            self.applyFilter();
        }
    };

    self.skipToList = function() {
        self.gradeView(false);
        self.techView(false);
        self.listView(true);
        self.applyFilter();
    };

    self.applyFilter = function() {
        console.log('applying Filter');
        var updatedGrid = ko.utils.arrayFilter(self.listGridData(), function(row) {
            return self.filterAll(row);
        });
        self.listFilterData(updatedGrid);
    };

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
        self.listFilterData.sort(sortFunc);
    }

    self.filterAll = function (row) {
        if (!filterObjectArrayArrayOverlap(self.gradeArray(), 'value', row.grades()))
            return false;
        if (!filterObjectArrayArrayOverlap(self.tech(), 'value', row.technology()))
            return false;
        return true;
    }
    //move to onload later
    self.gradeView = ko.observable(true);
    if (getUrlParameter('Length') != 0) {
        self.skipToList();
    }
};


//var ListModel = function (data) {
//   // var self = this;
//   // self.listGridData = ko.observableArray($.map(data, function (text) { return new Task(text) }));
//   // self.listFilterData = ko.observableArray($.map(data, function (text) { return new Task(text) }));
//   // self.grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
//   // self.technology = ['Andriod', 'Chomebook', 'iPads', 'Windows'];
//    //self.filters = ko.observableArray();
//    $.ajax({
//        dataType: 'json',
//        url: JSONFILEPATH_Filters,
//        success: function (data) {
//            self.filters($.map(data, function (text) { return new FilterGroups(text) }));
//        },
//        error: function (request, status, error) {
//            console.log('JSON file load unsuccessful', status, request, error);
//        }
//    });
//    //self.headers = [
//	//	{ title: 'Name', sortPropertyName: 'name', asc: true },
//	//	{ title: 'Url', sortPropertyName: 'url', asc: true },
//	//	{ title: 'Technology', sortPropertyName: 'technology', asc: true },
//	//	{ title: 'Grades', sortPropertyName: 'grades', asc: true }
//    //];
//    //self.sort = function (header, event) {
//    //    var prop = header.sortPropertyName;
//    //    var asc = header.asc;
//    //    header.asc = !header.asc;
//    //    var ascSort = function (a, b) { return a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0; };
//    //    var descSort = function (a, b) { return ascSort(b, a); };
//    //    var sortFunc = asc ? ascSort : descSort;
//    //    self.listFilterData.sort(sortFunc);
//    //}
//};

/**--------------SAMPLE DATA-------------------**/
var JSONGRADEARRAY = [
	{
	    "name": 'Kindergarten',
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
	    "name": 'Windows Computers',
	    "imgPath": '../../Images/Tailor/windows.jpg',
	    "value": 'Windows'
	},
	{
	    "name": 'Chromebooks',
	    "imgPath": '../../Images/Tailor/chromebook.jpg',
	    "value": 'Chomebook'
	},
	{
	    "name": 'Android Tablets',
	    "imgPath": '../../Images/Tailor/android.jpg',
	    "value": 'Android'
	},
	{
	    "name": 'iPads',
	    "imgPath": '../../Images/Tailor/iPad.jpg',
	    "value": 'iPad'
	}
];

var JSONLISTDATA = [
    {
        "name": 'Codecademy',
        "url": 'www.codecademy.com',
        "technology": ['Chomebook', 'Windows'],
        "grades": [9, 10, 11, 12]
    },
    {
        "name": 'code.org',
        "url": 'www.code.org',
        "technology": ['Chomebook', 'Windows'],
        "grades": [0, 1, 2, 3, 4, 5, 6]
    },
    {
        "name": 'Code Combat',
        "url": 'www.codecombat.com',
        "technology": ['Chomebook', 'Windows'],
        "grades": [4, 5, 6]
    },
    {
        "name": 'HopScotch',
        "url": 'www.gethopscotch.com',
        "technology": ['iPad'],
        "grades": [0,2, 3, 4, 5]
    }
];


var filterArrayProperty = function (array, value) {
    if (array != null && array.length > 0) {
        if ($.inArray(value, array) < 0) {
            return false;
        }
    }
    return true;
}

var filterObjectArrayArrayOverlap = function (objArray, attr, array) {
    var returnval = true;
    for (var i = 0; i < objArray.length; i++) {
        if (objArray[i].selectedValue()) {
            if (filterArrayProperty(array, objArray[i][attr]))
                return true;
            returnval = false;
        }
    }
    return returnval;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
}

function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return '';
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};