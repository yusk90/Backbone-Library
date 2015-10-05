(function (app) {
    app.BookView = app.BaseView.extend({
        tagName: 'li',
        className: 'library-list__item',
        template: _.template($('#single-book-template').html()),
        events: {
            'click .delete-book': 'deleteBook',
            'click .edit-book': 'editBook'
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render)
                .listenTo(this, 'disable-edit', this.disableElement);
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        deleteBook: function () {
            if (confirm('Вы действительно хотите удалить книгу?')) {
                if (this.editView) {
                    this.editView.close();
                }
                this.close();
                this.model.destroy();
            }
        },
        editBook: function () {
            this.editView = new app.EditView({
                model: this.model
            });
            this.listenTo(this.editView, 'disable-edit', this.disableElement);
            this.$el.append(this.editView.render().el);
            this.trigger('disable-edit', '.edit-book', true);
        }
    });
})(app);
