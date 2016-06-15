'use strict';

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename');

gulp.task("minifyScript", function() {
	gulp.src("js/script.js")
	.pipe(uglify())
	.pipe(rename('script.min.js'))
	.pipe(gulp.dest('js'));
})