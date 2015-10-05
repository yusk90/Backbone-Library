var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    clean = require('del'),
    distPath = 'dist';

gulp.task('default', ['clean', 'js-libs', 'js-app', 'css', 'watch']);

gulp.task('clean', function () {
    clean([distPath]);
});

gulp.task('js-libs', function () {
    gulp.src([
        'js/libs/jquery.js',
        'js/libs/underscore.js',
        'js/libs/backbone.js',
        'js/libs/backbone.localStorage.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(distPath));
});

gulp.task('js-app', function () {
    gulp.src([
        'init.js',
        'js/models/BookModel.js',
        'js/collections/LibraryCollection.js',
        'js/views/BaseView.js',
        'js/views/BookView.js',
        'js/views/EditView.js',
        'js/views/AppView.js',
        'app.js'
    ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(distPath));
});

gulp.task('css', function () {
    gulp.src(['css/style.css'])
        .pipe(minify())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(distPath));
});

gulp.task('watch', function () {
    gulp.watch('js/**/*.js', ['js-app']);
    gulp.watch('css/*.css', ['css']);
});