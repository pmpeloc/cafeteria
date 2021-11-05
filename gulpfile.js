// npm install gulpjs/gulp#v4.0.0-alpha.3 (para usar series)
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

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

function dev() {
  watch('src/scss/app.scss', css);
}

function tareaDefault() {
  console.log('soy la tarea por default');
}

exports.css = css;
exports.dev = dev;
exports.default = series(css, dev);

// series - Se inicia una tarea, y hasta que finaliza, inicia la siguiente
// parallel - Todas inician al mismo tiempo
