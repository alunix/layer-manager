import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const terserOptions = {
  safari10: true
};

const name = 'LayerManager';
const path = 'dist/layer-manager';
const globals = {
  axios: 'axios',
  leaflet: 'L',
  'lodash/compact': 'compact',
  'lodash/debounce': 'debounce',
  'lodash/isEmpty': 'isEmpty',
  'lodash/isEqual': 'isEqual',
  'lodash/sortBy': 'sortBy',
  'lodash/isObject': 'isObject',
  'prop-types': 'PropTypes',
  'react-dom': 'ReactDOM',
  react: 'React',
  '@deck.gl/core': '@deck.gl/core',
  '@deck.gl/mapbox': '@deck.gl/mapbox',
  '@loaders.gl/core': '@loaders.gl/core',
  '@loaders.gl/images': '@loaders.gl/images',
  '@luma.gl/core': '@luma.gl/core',
  '@luma.gl/constants': '@luma.gl/constants',
  earcut: 'earcut',
  '@mapbox/tiny-sdf': '@mapbox/tiny-sdf',
  'deck.gl': 'deck.gl',
  'luma.gl': 'luma.gl',
  'viewport-mercator-project': 'viewport-mercator-project'
};
const external = Object.keys(globals);
const babelOptions = () => ({
  babelrc: false,
  presets: [['env', { modules: false }], 'react'],
  plugins: [
    'transform-class-properties',
    'transform-object-rest-spread',
    'external-helpers',
    [
      'module-resolver',
      {
        root: ['./src/**'],
        extensions: ['.js', '.jsx']
      }
    ]
  ]
});

export default [
  {
    input: 'src/index.js',
    output: {
      file: pkg.module,
      format: 'es'
    },
    external,
    plugins: [babel(babelOptions()), resolve()]
  },
  {
    input: 'src/index.umd.js',
    output: {
      name,
      file: `${path}.js`,
      format: 'umd',
      globals
    },
    external,
    plugins: [babel(babelOptions()), resolve(), commonjs()]
  },
  {
    input: 'src/index.umd.js',
    output: {
      name,
      file: `${path}.min.js`,
      format: 'umd',
      globals
    },
    external,
    plugins: [babel(babelOptions()), resolve(), commonjs(), terser(terserOptions)]
  },
  // Components
  {
    input: 'src/components/index.js',
    output: {
      file: 'dist/components/index.esm.js',
      format: 'esm'
    },
    external,
    plugins: [babel(babelOptions()), resolve()]
  },
  {
    input: 'src/components/index.umd.js',
    output: {
      name,
      file: 'dist/components/index.js',
      format: 'umd',
      globals
    },
    external,
    plugins: [babel(babelOptions()), resolve(), commonjs()]
  }
];
