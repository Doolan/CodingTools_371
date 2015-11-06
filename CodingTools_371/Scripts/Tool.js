window.KO_MODEL;
$(document).ready(function () {
    //window.KO_MODEL = ViewToolsMain(JSONSITEINFO);
    //ko.applyBindings(window.KO_MODEL);

    var toolId = getUrlParameter('ID')


    $.ajax({
        url: 'GetProjectInfo',
        type: 'GET',
        data: { toolIdString: toolId === null ? 1 : toolId },
        dataType: 'JSON',
        success: function (data) {
            window.KO_MODEL = ViewToolsMain(data);
            ko.applyBindings(window.KO_MODEL);
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

var ViewToolsMain = function (data) {
    var self = this;
    self.toolIdString = data.ToolId;
    self.name = data.Name;
    self.url = data.Url;
    self.imageUrl = data.ImgPath;
   // self.reviews = data.reviews;
    self.desc = data.Description;
    self.tags = ko.observableArray($.map(data.Tags, function (text) { return new Tag(text) }));
};


/**--------------SAMPLE DATA-------------------**/
var JSONSITEINFO =
{
    "Name": 'Test',
    "Url": 'http://www.codeacademy.com',
    "img": '../../Images/Tool/Codeacademy.jpg',
    "desc": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisi tortor, eleifend a nulla sit amet, euismod cursus felis. Duis tincidunt sodales fermentum. Sed finibus tempus augue fringilla lobortis. Aenean mollis massa dui, id lacinia risus feugiat vitae. Duis tincidunt enim a neque accumsan hendrerit. Donec mollis, odio vitae finibus efficitur, quam diam efficitur diam, ac rhoncus justo est id urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    "reviews": ['review1 ', 'review 2'],
    "tags": [
            {'name': '8th Grade' },
            {'name': '9th Grade' },
            {'name': 'Laptop'},
            {'name': 'Chromebook'}
    ]
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




