var gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: '',
    port: 8888,
    livereload: true
  });
});

gulp.task('htmlwatcher', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['*.html','views/*.html','js/*.js','css/*.css'], ['htmlwatcher']);
});

gulp.task('default', ['connect', 'watch']);
