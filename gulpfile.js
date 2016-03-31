var gulp = require('gulp'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	babel = require('gulp-babel');

gulp.task('babel', function(){
	gulp.src('./src/js/**/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./build/'));
});

gulp.task('less', function(){
	gulp.src('./src/css/*.less')
		.pipe(less())
		.pipe(autoprefixer({
			browsers: ['last 15 versions']
		}))
		.pipe(gulp.dest('./build/'));
});


// watch files for live reload
gulp.task('watch', function() {
	gulp.watch('./src/js/**/*.js', ['babel']);
	gulp.watch('./src/css/*.less', ['less']);
});

gulp.task('default', [,'less', 'babel']);

gulp.task('serve', ['watch']);