function AppViewModel() {
    var self = this;
    self.name = ko.observable();
    self.email = ko.observable();
    self.title = ko.observable();
    self.username = ko.observable();
    //self.password = ko.observable();
    //self.confirmPassword = ko.observable();


}

$(document).ready(function () {
    console.log("js loading");

    ko.applyBindings(new AppViewModel());
});

var SubmitAddUser = function () {
    console.log("SubmitAddUser");
    $.ajax({
        url: 'AddUser',
        type: 'GET',
        data: {
            'name': self.name,
            'email': self.email,
            'title': self.title,
            'username': self.username
        },
        dataType: 'JSON',
        success: function (data) {
            console.log(data);
        },
        error: function (request, status, error) {
            console.log('failed get', request, status, error);
        }
    });
};