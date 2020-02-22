import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import prettier from 'rollup-plugin-prettier'
import { terser } from 'rollup-plugin-terser'

require('dotenv').config()

const localConfig = {
  input: 'server/assets/javascript/main-es.js',
  output: [
    {
      file: 'build/assets/js/main-es.js',
      format: 'es',
    },
  ],
  plugins: [
    resolve(),
    commonjs({ sourceMap: false }),
    alias({
      entries: [
        { find: '@utilities', replacement: './utilities' },
        { find: '@components', replacement: '../../components' },
      ],
    }),
  ],
}

const productionConfig = {
  input: 'server/assets/javascript/main-es.js',
  output: [
    {
      file: 'build/assets/js/main-es.js',
      format: 'es',
    },
    {
      file: 'build/assets/js/main-es.min.js',
      format: 'es',
      plugins: [terser()],
    },
    {
      file: 'build/assets/js/main.js',
      format: 'system',
    },
    {
      file: 'build/assets/js/main.min.js',
      format: 'system',
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve(),
    commonjs({ sourceMap: false }),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [['@babel/env', { modules: false }]],
    }),
    prettier({ parser: 'babel' }),
    alias({
      entries: [
        { find: '@utilities', replacement: './utilities' },
        { find: '@components', replacement: '../../components' },
      ],
    }),
  ],
}

const config = process.env.ENVIRONMENT === 'local' ? localConfig : productionConfig

export default config