window.KO_MODEL;
$(document).ready(function () {
    //window.KO_MODEL = ViewToolsMain(JSONSITEINFO);
    //ko.applyBindings(window.KO_MODEL);
    $('.body-content').hide();
    var toolId = getUrlParameter('ID');


    $.ajax({
        url: 'GetProjectInfo',
        type: 'GET',
        data: { toolIdString: toolId === null ? 1 : toolId },
        dataType: 'JSON',
        success: function (data) {
            window.KO_MODEL = ViewToolsMain(data);
            ko.applyBindings(window.KO_MODEL);
            $('.body-content').show();
        },
        error: function (request, status, error) {
            console.log('failed get', request, status, error);
        }
    });
});



// --------------------- Models ---------------------------------//

var Tag = function(data) {
    var self = this;
    self.name = data.TagName;
    self.value = data.TagValue;
    self.TagId = data.TagId;
}

var Review = function (data) {
    var self = this;
    self.title = data.Title;
    self.rating = data.Rating;
    self.content = data.Content;
    self.username = data.Username;
    self.ratingDisplay = self.rating + '/5';
}

var ViewToolsMain = function (data) {
    var self = this;
    self.toolIdString = data.ToolId;
    self.name = data.Name;
    self.url = data.Url;
    self.imageUrl = data.ImgPath;
   // self.reviews = data.reviews;
    self.desc = data.Description;
    self.tags = ko.observableArray($.map(data.Tags, function (text) { return new Tag(text) }));

    self.showReviews = ko.observable(false);
    self.reviewArray = ko.observableArray([]);


    self.loadReviews = function() {
        $.ajax({
            url: 'GetReviewList',
            type: 'GET',
            data: { 'toolIdString': self.toolIdString },
            dataType: 'JSON',
            success: function (data) {
                console.log(data);
                self.reviewArray($.map(data, function (text) { return new Review(text) }));
                self.showReviews(true);
                console.log(self.reviewArray());
            },
            error: function (request, status, error) {
                console.log('failed get', request, status, error);
            }
        });
    };
    self.loadReviews();


};




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




