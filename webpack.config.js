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
    Encore.addEntry(entryName + '_css', scssPath + entryName + '/index.scss')
})

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')


    .addEntry('app', './assets/app.js')

    .splitEntryChunks()

    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())

    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.23';
    })

    .enableSassLoader()

    .copyFiles({
        from: './assets/img',
        to: 'images/[path][name].[ext]',
    })
    ;

module.exports = Encore.getWebpackConfig();
