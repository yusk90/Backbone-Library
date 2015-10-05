(function (app) {
    app.BaseView = Backbone.View.extend({
        showErrors: function (model, errors) {
            _.each(errors, function (message, name) {
                this.$('#' + _.hyphen(name) + '-' + model.cid)
                    .siblings('.book-form__error').html(message);
            }, this);
        },
        disableElement: function (selector, mode) {
            this.$(selector).prop('disabled', mode);
        },
        close: function () {
            this.remove();
            this.unbind();
        }
    })
})(app);
