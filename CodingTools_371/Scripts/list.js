var JSONFILEPATH_MAIN = "../json/task.JSON";
var JSONFILEPATH_Filters = "../json/Filters.JSON";
var KO_MODEL;
$(document).ready(function () {
    $('.datepicker').datepicker();
    $.ajax({
        dataType: "json",
        url: JSONFILEPATH_MAIN,
        success: function (data) {
            window.KO_MODEL = new CodeModel(data);
            ko.applyBindings(window.KO_MODEL);
            console.log('hit');
            console.log(window.KO_MODEL);
        },
        error: function (request, status, error) {
            console.log('JSON file load unsuccessful', status, request, error);
        }
    });
    $('#tech-select').select2({ placeholder: 'Filter by Technology' });
    $('#grade-select').select2({ placeholder: 'Filter by Grade' });
});

var loadFilters = function (success_func) {
    $.ajax({
        dataType: "json",
        url: JSONFILEPATH_Filters,
        success: function (data) {
            success_func(data);
        },
        error: function (request, status, error) {
            console.log('JSON file load unsuccessful', status, request, error);
        }
    });
};


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
    self.options = ko.observableArray($.map(data.options, function (text) { return new Filter_Options(text) }));

};

var Filter_Options = function (data) {
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
    self.technology = ["Andriod", "Chomebook", "iPads", "Windows"];
    self.filters = ko.observableArray();
    $.ajax({
        dataType: "json",
        url: JSONFILEPATH_Filters,
        success: function (data) {
            self.filters($.map(data, function (text) { return new FilterGroups(text) }));
        },
        error: function (request, status, error) {
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

