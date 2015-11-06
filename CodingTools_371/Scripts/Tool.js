window.KO_MODEL;
$(document).ready(function () {
    window.KO_MODEL = ViewToolsMain(JSONSITEINFO);
    ko.applyBindings(window.KO_MODEL);

});



// --------------------- Models ---------------------------------//

var Tag = function(data) {
    var self = this;
    self.name = data.name;
}

var ViewToolsMain = function (data) {
    var self = this;
    self.name = data.name;
    self.url = data.url;
    self.imageUrl = data.img;
    self.reviews = data.reviews;
    self.desc = data.desc;
    self.tags = ko.observableArray($.map(data.tags, function (text) { return new Tag(text) }));

    //self.jumbotronCSS = '#d3d3d3 url('+ self.imageUrl+') center center;';
};


/**--------------SAMPLE DATA-------------------**/
var JSONSITEINFO =
{
    "name": 'Test',
    "url": 'http://www.codeacademy.com',
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











