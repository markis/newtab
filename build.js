var fs = require('fs');

var rollup = require('rollup');
var typescript = require('rollup-plugin-typescript');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var replace = require('rollup-plugin-replace');
var uglify = require('rollup-plugin-uglify');

/**
 * Rollup doesn't support building multiple files, but using their Javascript API we can
 */
compilejs('newtab.tsx', 'dist/newtab.js');
compilejs('background.ts', 'dist/background.js');

mkDir('dist');
copyFile('manifest.json', 'dist/manifest.json');
copyFile('templates/newtab.html', 'dist/newtab.html');
copyFile('stylesheets/newtab.css', 'dist/newtab.css');

function compilejs(inFile, outFile) {
  rollup.rollup({
    entry: inFile,
    plugins: [
      typescript({
        typescript: require('typescript')
      }),

      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),

      nodeResolve({
        jsnext: true,
        main: true,
        module: true
      }),

      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/react/react.js': ['Component', 'createElement', 'PropTypes'],
          'node_modules/react-dom/index.js': ['render']
        }
      }),

      uglify()
    ]
  })
  .then(function(bundle) {
    bundle.write({
      format: 'iife',
      dest: outFile
    });
  })
  .catch(function(err) {
    console.error(err);
  });
}

function copyFile(inFile, outFile) {
  fs.createReadStream(inFile).pipe(fs.createWriteStream(outFile));
}

function mkDir(dir) {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
}
