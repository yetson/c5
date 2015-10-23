var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var browserSync =require('browser-sync').create();

gulp.task("default", ['test', 'build', 'server'], function () {
    gulp.watch("./js/src/**/*.js", ['build']);
});

gulp.task('build', function(){
    gulp.src("./js/src/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat("all.js"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./js/dist"));
});

gulp.task("test", ["test-build"], function(){
    gulp.watch("./js/test/src/*.js", ["test-build"]);
});

gulp.task("test-build", function(){
    gulp.src("./js/test/src/*.js")
        .pipe(babel())
        .pipe(rename({
            prefix: "babel-"
        }))
        .pipe(gulp.dest("./js/test"));
});

gulp.task('server', function(){
   browserSync.init({
      server: {
        baseDir: './'
      },
      files: '.',
      browser: 'google chrome',
      reloadDelay: 1000
   });
});
