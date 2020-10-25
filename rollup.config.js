import { terser } from 'rollup-plugin-terser';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export default [
  {
    input: 'src/stats-counter.js',
    output: {
      format: 'es',
      file: IS_PRODUCTION
        ? 'dist/stats-counter.min.js'
        : 'dist/stats-counter.js',
    },
    plugins: [IS_PRODUCTION ? terser() : null],
  },
];
