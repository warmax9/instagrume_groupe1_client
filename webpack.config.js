const Encore = require('@symfony/webpack-encore');
const path = require('path');
const fs = require('fs');

const getDir = source =>
    fs.readdirSync(source, { withFileTypes: true})
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

const jsPath = "./assets/js/"
const scssPath = "./assets/styles/"

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

getDir(path.join(__dirname, jsPath)).forEach(entryName => {
    Encore.addEntry(entryName, jsPath + entryName + '/index.js')
})

getDir(path.join(__dirname, scssPath)).forEach(entryName => {
    console.log(entryName+ '_css');
    console.log(scssPath + entryName + '/index.scss');
    Encore.addEntry(entryName + '_css', scssPath + entryName + '/index.scss')
})

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')


    .addEntry('app', './assets/app.js')

    .splitEntryChunks()

    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // configure Babel
    // .configureBabel((config) => {
    //     config.plugins.push('@babel/a-babel-plugin');
    // })

    // enables and configure @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.23';
    })

    // enables Sass/SCSS support
    .enableSassLoader()

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment if you use React
    //.enableReactPreset()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    .autoProvidejQuery()
    .copyFiles({
        from: './assets/img',
        to: 'images/[path][name].[ext]',

        // if versioning is enabled, add the file hash too
        //to: 'images/[path][name].[hash:8].[ext]',

        // only copy files matching this pattern
        //pattern: /\.(png|jpg|jpeg)$/
    })
    ;

module.exports = Encore.getWebpackConfig();
