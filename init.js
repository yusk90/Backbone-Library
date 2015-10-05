_.mixin({
    capitalize: function (selector) {
        var selectorArr = selector.split('-');
        return selectorArr.reduce(function (accum, word) {
            return accum + word[0].toUpperCase() + word.slice(1);
        });
    },
    hyphen: function (selector) {
        return selector.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }
});

var app = {};
