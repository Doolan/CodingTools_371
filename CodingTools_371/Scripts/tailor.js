


var KO_MODEL;
$(document).ready(function () {
    //window.KO_MODEL = TailorMainModel({ "gradeArray": JSONGRADEARRAY, "technology": JSONTECHDATA, "toolList": JSONLISTDATA });
    //ko.applyBindings(window.KO_MODEL);
    $('.tailor-body').hide();
    $.ajax({
        url: 'GetToolList',
        type: 'GET',
        dataType:'JSON',
        success: function(data) {
            console.log(data);
            window.KO_MODEL = TailorMainModel(data);
            ko.applyBindings(window.KO_MODEL);
            $('.tailor-body').show();
        },
        error: function(request, status, error) {
            console.log('failed get', request, status, error);
        }
    });
});



// --------------------- Models ---------------------------------//
var Task = function (text) {
    var self = this;
    self.id = text.ToolId;
    self.name = text.Name;
    self.url = text.Url;
    self.Description = text.Description;
    self.technology = ko.observableArray([]);
    self.grades = ko.observableArray([]);
    self.displayTechnology = ko.observableArray([]);
    self.displayGrades = ko.observableArray([]);

    self.descPageUrl = '../Home/Tool?ID=' + self.id;

    self.SetFilterOptions = function(data)
    {
        for (var i = 0; i < data.length; i++)
        {
            if (data[i]['CategoryName'] === 'Technology') {
                //self.technology($.map(data[i]['Tags'], function (text) { return ' ' + text['TagValue'] }));
                self.technology(data[i]['Tags']);
                self.displayTechnology($.map(data[i]['Tags'], function (text) { return ' ' + text['TagName'] }));
            }
            if (data[i]['CategoryName'] === 'Grades') {
                //self.grades($.map(data[i]['Tags'], function (text) { return ' ' + text['TagValue'] }));
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
        //{ title: 'Url', sortPropertyName: 'url', asc: true },
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
        console.log(getUrlParameter('Length'));
        self.skipToList();
    }

    /** ---- List Length toggling   ---------**/
    self.gradesShortView = ko.observable(true);
    self.gradesLongView = ko.observable(false);

    self.gradesToggle = function () {
        console.log('hit');
        if (self.gradesShortView()) {
            self.gradesShortView(false);
            self.gradesLongView(true);
            $('#gradesOptions').css({ 'max-height': '' });
        } else {
            self.gradesShortView(true);
            self.gradesLongView(false);
            $('#gradesOptions').css({ 'max-height': '10em' });
        }
    }

};

var filterArrayProperty = function (array, value) {
    if (array != null && array.length > 0) {
        //if ($.inArray(value, array) < 0) {
        //    return false;
        //}
        for (var i = 0; i < array.length; i++) {
            if (array[i]['TagValue'] === value)
                return true;
        }
    }
    return false;
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