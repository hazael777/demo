var gulp = require('gulp')
var minifyCSS = require('gulp-minify-css')
var autoprefixer = require('gulp-autoprefixer')
var gp_concat = require('gulp-concat')
var gp_rename = require('gulp-rename')
var gp_uglify = require('gulp-uglify')
var path = require('path')

gulp.task('css', function () {
    return gulp.src(
        [
            './public/css/linearicons.css',
            './public/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
            './public/css/main.css',
            './public/css/animate.css'
        ]
    )
        .pipe(minifyCSS)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gp_concat(style.min.css))
        .pipe(gulp.dest('./public/dist/css/'))
})