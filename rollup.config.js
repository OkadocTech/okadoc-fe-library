import { terser } from 'rollup-plugin-terser';
import cleaner from 'rollup-plugin-cleaner';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
    input : {
        index: "./src/index.js",
        hmac: "./src/kong/index.js",
        cookies: "./src/oka-cookies/index.js"
    },
    output: [{
        entryFileNames: '[name].js',
        chunkFileNames: 'hashed/[name]-[hash].js',
        dir: 'lib',
        format: 'cjs',
        exports: 'named',
    }],
    plugins: [
        cleaner({
            targets: ['./lib'],
        }),
        peerDepsExternal({
            includeDependencies: true,
        }),
        terser({
            output: {
                comments: 'some',
            },
        }),
    ]
}