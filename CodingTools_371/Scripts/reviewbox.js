function AppViewModel() {
    var JSONSAMPLE = {
        "reviewTitle": 'SUPERCOOL REVIEW TITLE',
        "reviewerName": 'COOL DUDE',
        "reviewDate": 'OCT 1, 2015',
        "reviewBody": 'BLA BLA BLA'
    };

    this.reviewTitle = ko.observable(JSONSAMPLE.reviewTitle);
    this.reviewerName = ko.observable(JSONSAMPLE.reviewerName);
    this.reviewDate = ko.observable(JSONSAMPLE.reviewDate);
    this.reviewBody = ko.observable(JSONSAMPLE.reviewBody);
    

    

    this.tagList = ko.observable('<p class="tag" id="3rd-grade">3rd Grade</p><p class="tag" id="ios">iOS</p><p class="tag" id="android">Android</p>")');


   /* this.fullName = ko.computed(function () {
        return this.firstName() + " " + this.lastName();
    }, this);
    */

}

$(document).ready(function () {
   // window.KO_MODEL = TailorMainModel({ "gradeArray": JSONGRADEARRAY, "technology": JSONTECHDATA, "toolList": JSONLISTDATA });
    //ko.applyBindings(window.KO_MODEL);

    console.log("js loading");

    //var parsed = JSON.parse(JSONSAMPLE);



    //AppViewModel.reviewTitle(JSONSAMPLE.reviewTitle);

    /*
    $.ajax({
        url: 'GetToolList',
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            console.log(data);
        },
        error: function (request, status, error) {
            console.log('failed get', request, status, error);
        }
    });
    */



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
        "grades": [0, 2, 3, 4, 5]
    }
    ];
    

    // Activates knockout.js
    ko.applyBindings(new AppViewModel());

});