window.KO_MODEL;
$(document).ready(function () {
    //window.KO_MODEL = ViewToolsMain(JSONSITEINFO);
    //ko.applyBindings(window.KO_MODEL);
    $('.tool-body').hide();
    var toolId = getUrlParameter('ID');


    $.ajax({
        url: 'GetProjectInfo',
        type: 'GET',
        data: { toolIdString: toolId === null ? 1 : toolId },
        dataType: 'JSON',
        success: function (data) {
            window.KO_MODEL = ViewToolsMain(data);
            ko.applyBindings(window.KO_MODEL);
            $('.tool-body').show();
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

var ReviewModal = function(parent) {
    var self = this;
    self.parent = parent;
    self.title = ko.observable();
    self.rating = ko.observable();
    self.description = ko.observable();

    self.submitReview = function() {
        //$('#modal-form').checkValidity();
        if ($('form')[0].checkValidity()) {
            var packet = {
                'userId': 32,
                'toolId': self.parent.toolIdString,
                'title': self.title(),
                'rating': self.rating(),
                'description': self.description()
            }
            console.log(packet);
            $.ajax({
                url: 'SubmitReview',
                type: 'Post',
                data: packet,
                dataType: 'JSON',
                success: function(data) {
                    console.log('new reviews', data);
                    self.parent.reviewArray($.map(data, function (text) { return new Review(text) }));
                    $('#reviewModal').hide();
                },
                error: function(request, status, error) {
                    console.log('failed get', request, status, error);
                }
            });
        } else {
            $('<input type="submit" id="tempbutton">').hide().appendTo($('#modal-form')).click().remove();
        }

    }
}

var ViewToolsMain = function (data) {
    var self = this;
    self.toolIdString = data.ToolId;
    self.name = data.Name;
    self.url = data.Url;
    self.imageUrl = data.ImgPath;
    self.nameLink = 'Go to ' + self.name;
    self.desc = data.Description;
    self.nameLink = 'Go to ' + self.name;
    self.tags = ko.observableArray($.map(data.Tags, function (text) { return new Tag(text) }));
    self.chart = ko.observable();
    self.showReviews = ko.observable(false);
    self.reviewArray = ko.observableArray([]);
    
    self.modal = ko.observable(new ReviewModal(self));

    self.loadReviews = function() {
        $.ajax({
            url: 'GetReviewList',
            type: 'GET',
            data: { 'toolIdString': self.toolIdString },
            dataType: 'JSON',
            success: function (data) {
                console.log(data);
                self.updateReviewData(data);
                self.showReviews(true);
                console.log(self.reviewArray());
            },
            error: function (request, status, error) {
                console.log('failed get', request, status, error);
            }
        });
    };

    self.updateReviewData =  function(data)
    {
        self.reviewArray($.map(data.Reviews, function (text) { return new Review(text) }));
        self.chart(new Chart(data.Chart));
    }

    self.loadReviews();
};

var Bars = function (text) {
    //constants
    var self = this;
   // self.isRange = isRange;
    self.label = text.Label;
    self.color = text.ColorCode;
    self.rankingWord = text.RankingWord;
    self.displayLabel = ko.computed({
        read: function () {
            if (self.isRange) {
                if (self.label > 1)
                    return '> ' + (self.label - 1) + ' ' + text.RankingWord;
                else {
                    return self.label + ' ' + text.RankingWord;
                }
            }
            return self.label + ' - ' + text.RankingWord;
        }
    });

    //observables
    self.count = ko.observable(text.NumberOfScore);
    self.width = ko.observable(text.Width);
    //self.toolTip = ko.observable(text.NumberOfScore > 1 ? text.NumberOfScore + ' ' + text.RankingWord + ' rankings' : text.NumberOfScore + ' ' + text.RankingWord + ' ranking');

    self.displayCount = ko.computed({
        read: function () {
            return self.count();
        },
        write: function (value) {
            self.count(value);
            //self.toolTip(value > 1 ? value + ' ' + self.rankingWord + ' rankings' : value + ' ' + self.rankingWord + ' ranking');
        }
    });


    self.displayWidth = ko.computed({
        read: function () {
            return self.width().toFixed(2) + '%';
        },
        write: function (value) {
            self.width(value * 100);
        }
    });
}

var Chart = function(text) {
    var self = this;
    self.bar = ko.observableArray($.map(text.Rows, function(rows) { return new Bars(rows) }));
    self.averageScore = ko.observable(text.AverageScore);
    self.rankingWord = ko.observable(text.RankingWord);
    self.displayScore = ko.computed({
        read: function() {
            return self.averageScore().toFixed(2);
        },
        write: function(value) {
            self.averageScore(value);
            self.displayRankingWord(value);
        }
    });

    self.displayRankingWord = ko.computed({
        read: function() {
            return self.rankingWord();
        },
        write: function(value) {
            var rankingWords = ['', 'Very Poor', 'Poor', 'Fair', 'Good', 'Very Good'];
            var floor = Math.floor(value);
            var ceiling = Math.ceil(value);
            if (floor === ceiling)
                self.rankingWord(rankingWords[floor]);
            else
                self.rankingWord(rankingWords[floor] + ' - ' + rankingWords[ceiling]);
        }
    });


    self.rankingWords = text.RankingWord;
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




