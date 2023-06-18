const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const browserSyncJob = () => {
  browserSync.init({
    server: "build/"
  });

  watch('./app/bootstrap/*.scss', buildBootstrapSass);
  watch('./app/sass/*.scss', buildSass);
  watch('./app/**/*.pug', buildPug);
  // copyFile()
}

const buildBootstrapSass = () => {

  return src('./app/bootstrap/*.scss')
    .pipe(sass())
    .pipe(concat('bootstrap_mod.css'))
    .pipe(dest('build/styles/'))
    .pipe(browserSync.stream());
}

const buildSass = () => {

  return src('./app/sass/*.scss')
    .pipe(sass())
    .pipe(concat('index.css'))
    .pipe(dest('build/styles/'))
    .pipe(browserSync.stream());
}


const buildPug = () => {

  return src('./app/*.pug')
    .pipe(pug())
    .pipe(dest('build/'))
    .pipe(browserSync.stream());
}

// const copyFile = () => {
    
//   return src('./app/bootstrap/bootstrap.min.css')
//     .pipe(dest('build/bootstrap/'))
// };

exports.server = browserSyncJob;
exports.build = parallel(buildBootstrapSass, buildSass, buildPug);