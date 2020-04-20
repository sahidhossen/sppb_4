
const webpack = require('webpack');
const devMode = process.env.NODE_ENV;

if (devMode === 'production') {
    module.exports =  require('./config/webpack.config.prod');
}

if (devMode === 'development') {
    module.exports = require('./config/webpack.config.dev');
}