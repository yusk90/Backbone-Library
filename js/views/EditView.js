(function (app) {
    app.EditView = app.BaseView.extend({
        tagName: 'form',
        className: 'book-form',
        id: function () {
            return 'edit-form-' + this.model.cid;
        },
        template: _.template($('#edit-form-template').html()),
        events: {
            'click .submit-edited-book': 'submitEditedBook',
            'click .cancel-edit': 'cancelEdit'
        },
        render: function () {
            this.$el.html(this.template(this.model));
            _.each(this.model.toJSON(), this.fillEditFields, this);
            return this;
        },
        fillEditFields: function (value, key) {
            this.$('#' + _.hyphen(key + '-' + this.model.cid)).val(value);
        },
        submitEditedBook: function () {
            var $formFields = this.$('input'),
                formData = {},
                modelId = this.model.cid;

            Backbone.trigger('clear-errors');
            this.listenTo(this.model, 'invalid', this.showErrors);

            function serializeFormData(input) {
                formData[_.capitalize(input.id.replace('-' + modelId, ''))]
                    = encodeURIComponent(input.value);
            }
            _.each($formFields, serializeFormData, this);

            /*this.model.save(formData)
                .done(function() {
                    Backbone.trigger('disable-edit-buttons', false);
                    this.remove();
                    this.unbind();
                }.bind(this))
                .fail(function () {
                    alert('fail');
                });*/
            this.model.save(formData, {
                success: function () {
                    this.cancelEdit();
                }.bind(this)
            });
        },
        cancelEdit: function () {
            this.trigger('disable-edit', '.edit-book', false);
            this.close();
        }
    });
})(app);
