const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

const browserSyncJob = () => {
  browserSync.init({
    server: "build/"
  });

  watch('./app/**/*.scss', buildSass);
  watch('./app/**/*.pug', buildPug);
  copyFile()
}

const buildSass = () => {

  return src('./app/**/*.scss')
    .pipe(sass())
    .pipe(dest('build/styles/'))
    .pipe(browserSync.stream());
}

const buildPug = () => {

  return src('./app/**/*.pug')
    .pipe(pug())
    .pipe(dest('build/'))
    .pipe(browserSync.stream());
}

const copyFile = () => {
    
  return src('./app/bootstrap/bootstrap.min.css')
    .pipe(dest('build/bootstrap/'))
};

exports.server = browserSyncJob;
exports.build = parallel(buildSass, buildPug);