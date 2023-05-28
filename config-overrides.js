const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

// config-overrides.js
module.exports = function override(config, env) {
    if (!config.plugins) {
        config.plugins = [];
    }
    config.plugins = [
        ...config.plugins,
        new MonacoWebpackPlugin({ languages: ['json'], features: ["find"] })
    ];
    return config;
}
