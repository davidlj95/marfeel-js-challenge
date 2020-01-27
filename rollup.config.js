import resolve from '@rollup/plugin-node-resolve';

export default {
    input: './src/js/app.js',
    output: {
        file: './build/bundle.min.js',
        format: 'iife',
        name: 'bundle'
    },
    plugins: [
        resolve()
    ]
}
