import gulp from 'gulp';
import gutil from 'gutil';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';

gulp.task('default', ['static', 'webpack:build-dev'], () => {
  gulp.watch(['./js/**/*'], ['webpack:build-dev']);
  gulp.watch(['./static/**/*'], ['static']);
});

const myDevConfig = { ...webpackConfig };
myDevConfig.devtool = 'sourcemap';
myDevConfig.debug = true;

// create a single instace of the compiler to allow caching
const devCompiler = webpack(myDevConfig);

gulp.task('webpack:build-dev', done => {
  devCompiler.run((err, stats) => {
    if (err) throw new gutil.PluginError('webpack:build-dev', err);
    gutil.log('[webpack:build-dev', stats.toString({ colors: true }));
    done();
  });
});

gulp.task('static', () => {
  return gulp.src('./static/**/*')
    .pipe(gulp.dest('build/'));
});