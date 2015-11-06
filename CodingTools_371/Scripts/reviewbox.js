function AppViewModel() {
    var JSONSAMPLE = {
        "reviewTitle": 'SUPERCOOL REVIEW TITLE',
        "reviewerName": 'COOL DUDE',
        "reviewDate": 'OCT 1, 2015',
        "reviewBody": 'BLA BLA BLA',
    };

    var rTitle = "title";
    var reviewTitle = ko.observable(rTitle);

    var reviewList = null;
    
    $.ajax({
        url: 'GetReviewList',
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            console.log(data);
            reviewList = data;

            //rTitle = reviewList[0].Title;
            //this.reviewerName = ko.observable(reviewList[0].Username);
            //this.reviewDate = ko.observable("DATE");
            //this.reviewBody = ko.observable(reviewList[0].Content);

            //this.reviewTitle("json success");

        },
        error: function (request, status, error) {
            console.log('failed get', request, status, error);
        }
    });



    /*
    this.reviewTitle = ko.observable(JSONSAMPLE.reviewTitle);
    this.reviewerName = ko.observable(JSONSAMPLE.reviewerName);
    this.reviewDate = ko.observable(JSONSAMPLE.reviewDate);
    this.reviewBody = ko.observable(JSONSAMPLE.reviewBody);
    */


    

    this.tagList = ko.observable('<p class="tag" id="3rd-grade">3rd Grade</p><p class="tag" id="ios">iOS</p><p class="tag" id="android">Android</p>")');


   /* this.fullName = ko.computed(function () {
        return this.firstName() + " " + this.lastName();
    }, this);
    */

}

$(document).ready(function () {
    //var parsed = JSON.parse(JSONSAMPLE);

    //AppViewModel.reviewTitle(JSONSAMPLE.reviewTitle);

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
    
    ko.applyBindings(new AppViewModel());
});