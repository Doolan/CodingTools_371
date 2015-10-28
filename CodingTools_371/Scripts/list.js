var JSONFILEPATH_MAIN = '../json/task.JSON';
var JSONFILEPATH_Filters = '../json/Filters.JSON';
var KO_MODEL;
$(document).ready(function () {

   // $.ajax({
     //   dataType: "json",
    //    url: JSONFILEPATH_MAIN,
   //     success: function (data) {
            window.KO_MODEL = new CodeModel(TASKJSON);
            ko.applyBindings(window.KO_MODEL);
            console.log('hit');
            console.log(window.KO_MODEL);
    //    },
   //     error: function (request, status, error) {
   //         console.log('JSON file load unsuccessful', status, request, error);
   //     }
 //   });

});

//Filtering
var filterArrayProperty = function (array, rowValue) {
    if (array != null && array.length > 0) {
        if ($.inArray(rowValue, array) < 0) {
            return false;
        }
    }
    return true;
};

var filterArrayPropertyArrayValues = function (array, rowValueArray) {
    if (array != null && array.length > 0) {
        var found = false;
        rowValueArray.forEach(function (value) {
            if ($.inArray(value, array) >= 0) {
                return true;
            }
        });
        return false;
    }
    return true;
};


var filterTag = function (row, name, url, technology, grades) {
    //update arrays for name, url, technolgy, and grades -- sounds like fun
    return true;
};


// --------------------- Models ---------------------------------//
var Task = function (text) {
    var self = this;
    self.name = text.name;
    self.url = text.url;
    self.technology = text.technology;
    self.grades = text.grades;
};

var FilterGroups = function (data) {
    var self = this;
    self.name = data.name;
    self.options = ko.observableArray($.map(data.options, function (text) { return new FilterOptions(text) }));

};

var FilterOptions = function (data) {
    var self = this;
    self.name = data.name;
    self.values = data.values;
    self.html = '<input type="checkbox" value="' + self.values + '">' + self.name;
};


var CodeModel = function (data) {
    var self = this;
    self.gridData = ko.observableArray($.map(data, function (text) { return new Task(text) }));
    self.filterData = ko.observableArray($.map(data, function (text) { return new Task(text) }));
    self.grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    self.technology = ['Andriod', 'Chomebook', 'iPads', 'Windows'];
    self.filters = ko.observableArray();
   // $.ajax({
   //     dataType: "json",
   //     url: JSONFILEPATH_Filters,
  //      success: function (data) {
          self.filters($.map(FILTERJSON, function (text) { return new FilterGroups(text) }));
  //      },
 //       error: function (request, status, error) {
 //           console.log('JSON file load unsuccessful', status, request, error);
 //       }
 //   });




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

var TASKJSON = [
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
        "grades": [1, 2, 3, 4, 5, 6]
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
        "grades": [2, 3, 4, 5]
    }
];

var FILTERJSON = [
    {
        "name": 'Grades',
        "options": [
            {
                "name": '2nd and Under',
                "values": [0, 1, 2]
            },
            {
                "name": '3rd through 5th',
                "values": [3, 4, 5]
            },
            {
                "name": '6th and 8th',
                "values": [6, 7, 8]
            },
            {
                "name": '9th through 10th',
                "values": [9, 10]
            },
            {
                "name": '10th through 12th',
                "values": [10, 11, 12]
            }
        ]
    },
    {
        "name": 'Technology',
        "options": [
            {
                "name": 'Android',
                "values": ['Android']
            },
            {
                "name": 'Chromebook',
                "values": ['Chromebook']
            },
            {
                "name": 'iPads',
                "values": ['iPads']
            },
            {
                "name": 'Windows',
                "values": ['Windows']
            }
        ]
    }
];