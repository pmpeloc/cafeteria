// Tener en cuenta de modificar el package.json
// ejecutar npm i, luego npx npm-force-resolutions y luego npm i
function tarea(done) {
  console.log('Desde mi primer tarea...');
  done();
}

exports.tarea = tarea;
