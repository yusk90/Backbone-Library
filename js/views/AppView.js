(function (app) {
    app.AppView = app.BaseView.extend({
        el: 'body',
        initialize: function () {
            this.collection = new app.LibraryCollection();
            this.listenTo(this.collection, 'reset', this.addAll)
                .listenTo(Backbone, 'clear-errors', this.clearErrors);
            this.collection.fetch({reset: true});
        },
        events: {
            'click #submit-book': 'submit'
        },
        clearErrors: function () {
            this.$('.book-form__error').html('');
        },
        submit: function () {
            var $formFields = this.$('#book-form input'),
                formData = {},
                errors = {};

            Backbone.trigger('clear-errors');
            (function validateForm() {
                function serializeFormData(input) {
                    formData[_.capitalize(input.id)] = encodeURIComponent(input.value);
                }
                _.each($formFields, serializeFormData, this);

                if (!formData.book) {
                    errors.book = 'Введите название книги.';
                }
                if (!formData.author) {
                    errors.author = 'Введите автора.';
                }
                if (!formData.publishYear) {
                    errors.publishYear = 'Введите год издания.';
                }
                if (!formData.publishHouse) {
                    errors.publishHouse = 'Введите издательство.';
                }
                return errors;
            })();
            if (_.isEmpty(errors)) {
                var book = new app.BookModel();
                book.set(formData);
                $formFields.val('');
                this.collection.create(book);
                var bookView = new app.BookView({
                    model: book
                });
                this.$('#library-list').append(bookView.render().el);
            } else {
                this.showErrors(errors);
            }
        },
        showErrors: function (errors) {
            _.each(errors, function (message, name) {
                this.$('#' + _.hyphen(name))
                    .siblings('.book-form__error').html(message);
            }, this);
        },
        addAll: function () {
            var $fragment = $(document.createDocumentFragment());
            function appendBook(book) {
                var bookView = new app.BookView({
                    model: book
                });
                $fragment.append(bookView.render().el);
            }
            this.collection.each(appendBook, this);
            this.$('#library-list').append($fragment);
        }
    });
})(app);
