// npm install gulpjs/gulp#v4.0.0-alpha.3 (para usar series)
const { src, dest, watch, series, parallel } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
  // Compilar sass
  // Pasos: 1- identificar archivo, 2- compilar, 3- guardar el .css
  src('src/scss/app.scss')
    // .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('build/css'));
  done();
}

function imagenes(done) {
  src('src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(dest('build/img'));
  done();
}

function versionAvif() {
  const opciones = {
    quality: 50,
  };
  return src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'));
}

function versionWebp() {
  const opciones = {
    quality: 50,
  };
  return src('src/img/**/*.{png,jpg}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'));
}

function dev() {
  watch('src/scss/**/*.scss', css);
  watch('src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(css, imagenes, versionWebp, versionAvif, dev);

// series - Se inicia una tarea, y hasta que finaliza, inicia la siguiente
// parallel - Todas inician al mismo tiempo
