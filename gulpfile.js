const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('styles', function() {
  return gulp.src("./sass/*.+(scss|sass)")
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch('./sass/*.+(scss|sass)', gulp.parallel("styles"))
  gulp.watch('./*.html').on('change', browserSync.reload)
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));