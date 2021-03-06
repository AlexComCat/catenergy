"use strict";

var less = require("gulp-less"),
    gulp = require("gulp"),
    plumber = require("gulp-plumber"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    minify = require("gulp-csso"),
    rename = require("gulp-rename"),
    htmlmin = require("gulp-htmlmin"),
    del = require("del"),
    uglify = require("gulp-uglify"),
    imagemin = require("gulp-imagemin"),
    webp = require("gulp-webp"),
    browserSync = require("browser-sync").create();

gulp.task("style", function(done) {
    gulp.src("source/less/style.less")
        .pipe(plumber())
        .pipe(less())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest("source/css"))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("source/css"))
        .pipe(browserSync.stream());

    done();
});

gulp.task("htmlminify", () => {
    return gulp.src("source/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("build"));
});

gulp.task("compress", function () {
    return gulp.src("source/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("build/js"))
        .pipe(browserSync.stream());
});

gulp.task("images", function () {
    return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true}),
        imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
    return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
});

gulp.task("serve", function (done) {
    browserSync.init({
        server: "build/"
    });
    gulp.watch("source/less/**/*.less", gulp.series("style", "clean", "copy"));
    gulp.watch("source/*.html", gulp.series("htmlminify"));
    gulp.watch("source/js/**/*.js", gulp.series("compress"));

    gulp.watch("source/*.html").on("change", () => {
        browserSync.reload();
        done();
    });

    done();
});

gulp.task("clean", function () {
    return del("build");
});

gulp.task("copy", function () {
    return gulp.src([
        "source/fonts/**/*.{woff,woff2}",
        "source/img/**",
        "source/js/**",
        "source/css/**",
    ], {
        base: "source"
    })
    .pipe(gulp.dest("build"));
});

// Run build
gulp.task("build", gulp.series("style",
                                "clean",
                                "copy",
                                "compress",
                                "htmlminify",
                                "serve"));
