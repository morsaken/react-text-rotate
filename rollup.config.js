import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { dependencies, name, peerDependencies } from './package.json';

// the entry point for the library
const input = './src/App.js';

const config = ['cjs', 'esm', 'umd'].map(format => ({
  input,
  output: {
    name,
    file: `build/index.${format}`,
    format,
    exports: 'auto',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes'
    }
  },
  inlineDynamicImports: true,
  // this externalizes react to prevent rollup from compiling it
  external: [
    ...Object.keys(dependencies || {}),
    ...Object.keys(peerDependencies || {})
  ],
  plugins: [
    builtins(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'react-is': ['isForwardRef', 'isValidElementType'],
      }
    }),
    nodeResolve({ preferBuiltins: true, moduleDirectories: ['src'] }),
    // these are babel configurations
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
    sourcemaps()
  ]
}));

export default config;
