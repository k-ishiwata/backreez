const mix = require('laravel-mix');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/ts/index.tsx', 'public/js/app.js')
    .sass('resources/scss/app.scss', 'public/css')
    .extract();

mix.webpackConfig({
    // ルートパスの設定
    resolve: {
        extensions: ['.ts', '.tsx'],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })]
    },
});

if (mix.inProduction()){
    mix.version();
}
