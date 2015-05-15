var gulp = require('gulp');
var gutil = require('gulp-util');
var ts = require('gulp-typescript');
var del = require('del');
var gulpCopy = require('gulp-copy');

gulp.task('default', ['build', 'copy-static'], function() {
  gutil.log(gutil.colors.green('Your app should run from the ./output folder, like so:'));
  gutil.log('   ', gutil.colors.bgGreen('node ./output/server.js'));
});

gulp.task('build', ['clean'], function() {

  var tsProject = ts.createProject('tsconfig.json');

  var tsResult = tsProject.src()
    .pipe(ts(tsProject));

  return tsResult.js.pipe(gulp.dest('output'));

});

gulp.task('clean', function(cb) {
  del('output', cb);
})

gulp.task('copy-static', ['clean'], function() {
  var source = [
    'views/**/*',
    'public/**/*'
    ]

  return gulp.src(source)
    .pipe(gulpCopy('output'));
});
