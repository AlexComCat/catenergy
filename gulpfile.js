"use strict";

var less = require('gulp-less');
var gulp = require('gulp');
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var browserSync = require('browser-sync').create();

gulp.task("less", function(done) {
    gulp.src("source/less/style.less")
        .pipe(plumber())
        .pipe(less())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest("source/css"))
        .pipe(browserSync.stream());

    done();
});
gulp.task("serve", function (done) {
    browserSync.init({
        server: "source/"
    });
    gulp.watch("source/less/**/*.less", gulp.series('less'));
    gulp.watch("source/*.html").on("change", () => {
        browserSync.reload();
        done();
    });

    done();
});
gulp.task('default', gulp.series('less', 'serve'));
