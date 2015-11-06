function AppViewModel() {
    this.username = ko.observable();
    this.password = ko.observable();
}

$(document).ready(function () {
    console.log("js loading");

    ko.applyBindings(new AppViewModel());
});