'use strict';

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	  sass = require('gulp-sass'),
	  maps = require('gulp-sourcemaps'),
	   del = require('del');

gulp.task("minifyScript", function() {
	return gulp.src("js/script.js")
	.pipe(uglify())
	.pipe(rename('script.min.js'))
	.pipe(gulp.dest('js'));
});

gulp.task("compileSass", function() {
	return gulp.src("scss/main.scss")
	.pipe(maps.init())
	.pipe(sass())
	.pipe(maps.write('./'))
	.pipe(gulp.dest('css'));
});

gulp.task("watchFiles", function() {
	gulp.watch('scss/*.scss', ['compileSass']);
});

gulp.task("clean", function(){
	del(['dist', 'css/main.css*', 'js/script.min.js', '.sass-cache'])
})

gulp.task("build", ['minifyScript', 'compileSass'], function() {
	return gulp.src(["css/main.css", "js/script.min.js", "index.html",
									"img/**"], {base: './'})
	.pipe(gulp.dest('dist'));
});

gulp.task("default", ['build']);