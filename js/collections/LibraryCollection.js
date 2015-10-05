(function (app) {
    app.LibraryCollection = Backbone.Collection.extend({
        model: app.BookModel,
        localStorage: new Backbone.LocalStorage('Library')
    });
})(app);
