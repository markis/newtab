var rollup = require('rollup');
var typescript = require('rollup-plugin-typescript');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var replace = require('rollup-plugin-replace');

rollup.rollup({
  entry: 'newtab.tsx',
  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    nodeResolve({
      jsnext: true,
      main: true,
      module: true
    }),

    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/react.js': ['PropTypes', 'createElement', 'Component'],
        'node_modules/react-dom/index.js': ['render']
      }
    }),
  ]
})
.then(function(bundle) {
  var result = bundle.generate({
    // output format - 'amd', 'cjs', 'es', 'iife', 'umd'
    format: 'cjs'
  });

  bundle.write({
    dest: 'dist/newtab.js',
    format: 'iife'
  });
})
.catch(function(err) {
  console.error(err);
})


// module.exports = {
//   entry: './src/index.ts',
//   dest: 'index.js',
//   format: 'cjs',
//   plugins: [
//     typescript({
//       typescript: require('typescript')
//     }),
//   ]
// };
