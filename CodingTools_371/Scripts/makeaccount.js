$(document).ready(function () {
    console.log("js loading");

    ko.applyBindings(new AppViewModel());
});



var AppViewModel = function () {
    var self = this;
    self.name = ko.observable();
    self.email = ko.observable();
    self.title = ko.observable();
    self.username = ko.observable();
    self.password = ko.observable();
    //self.confirmPassword = ko.observable();





    self.SubmitAddUser = function () {
        console.log("SubmitAddUser");

        console.log("name " + self.name());
        console.log("email " + self.email());
        console.log("title " + self.title());
        console.log("username " + self.username());
        console.log("password " + self.password());
        //console.log("confirmPassword " + self.confirmPassword());

        $.ajax({
            url: 'AddUser',
            type: 'GET',
            data: {
                'Name': self.name(),
                'Email': self.email(),
                'Title': self.title(),
                'Username': self.username(),
                'Password': self.password()
            },
            dataType: 'JSON',
            success: function (data) {
                console.log(data);
            },
            error: function (request, status, error) {
                console.log('failed get', request, status, error);
            }
        });


    }
}