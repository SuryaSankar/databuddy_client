import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import scss from 'rollup-plugin-scss'
import pkg from './package.json';

export default {
    input: 'src/index.js',
    external: ['ms'],
    plugins: [
        resolve(), // so Rollup can find `ms`
        commonjs(),// so Rollup can convert `ms` to an ES module
        terser(),
        scss({
            output: 'dist/databuddy-client.min.css',
            outputStyle: "compressed"
        }),
    ],
    output: [
        {
            name: 'databuddy-client',
            file: pkg.browser,
            format: 'umd',
        },
        { 
            file: pkg.module,
            format: 'es' 
        }, 
        {
            file: pkg.main,
            format: 'cjs'
        }        
    ],
};