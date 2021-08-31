import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [{
    format: 'cjs',
    file: 'dist/index.umd.js'
  }, {
    format: 'es',
    file: 'dist/index.es.js'
  }],
  plugins: [typescript()]
};
