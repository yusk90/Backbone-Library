(function (app) {
    app.BookModel = Backbone.Model.extend({
        defaults: {
            book: '',
            author: '',
            publishYear: '',
            publishHouse: ''
        },
        validate: function (attrs) {
            var errors = {};

            if (!attrs.book) {
                errors.book = 'Введите название книги.';
            }
            if (!attrs.author) {
                errors.author = 'Введите автора.';
            }
            if (!attrs.publishYear) {
                errors.publishYear = 'Введите год издания.';
            }
            if (!attrs.publishHouse) {
                errors.publishHouse = 'Введите издательство.';
            }
            return _.isEmpty(errors) ? false : errors;
        }
    });
})(app);
