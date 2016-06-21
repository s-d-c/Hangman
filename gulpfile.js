'use strict';

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	  sass = require('gulp-sass'),
	  maps = require('gulp-sourcemaps');

gulp.task("minifyScript", function() {
	gulp.src("js/script.js")
	.pipe(uglify())
	.pipe(rename('script.min.js'))
	.pipe(gulp.dest('js'));
});

gulp.task("compileSass", function() {
	gulp.src("scss/main.scss")
	.pipe(maps.init())
	.pipe(sass())
	.pipe(maps.write('./'))
	.pipe(gulp.dest('css'));
});
