function AppViewModel() {
    this.username = ko.observable();
    this.email = ko.observable();
    this.password = ko.observable();
    this.confirmPassword = ko.observable();
}

$(document).ready(function () {
    ko.applyBindings(new AppViewModel());
});