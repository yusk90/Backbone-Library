(function (app) {
    app.AppView = app.BaseView.extend({
        el: 'body',
        initialize: function () {
            this.model = new app.BookModel();
            this.collection = new app.LibraryCollection();
            this.listenTo(this.collection, 'reset', this.addAll)
                .listenTo(this.model, 'invalid', this.showErrors)
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
                formData = {};

            Backbone.trigger('clear-errors');
            function serializeFormData(input) {
                formData[_.capitalize(input.id)] = encodeURIComponent(input.value);
            }
            _.each($formFields, serializeFormData, this);
            this.model.set(formData);
            if (this.model.isValid()) {
                var book = new app.BookModel();
                book.set(formData);
                $formFields.val('');
                this.collection.create(book);
                var bookView = new app.BookView({
                    model: book
                });
                this.$('#library-list').append(bookView.render().el);
            }
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
