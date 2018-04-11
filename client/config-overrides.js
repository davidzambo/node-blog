const rewireProvidePlugin = require('react-app-rewire-provide-plugin');
const {injectBabelPlugin} = require('react-app-rewired');
/* **
** Default scripts in package.json have been replaced
**    with react-app-rewired: https://github.com/timarney/react-app-rewired
**  This allow for injecting things into the webpack.config.js
**    during start and build.  Note: apparently jest is used rather
**    than webpack for test.
******/
/* config-overrides.js */
module.exports = function override(config, env) {
    config = rewireProvidePlugin(config, env, {
        'window.Quill': ['react-quill', 'Quill']
    });
    console.log('overriding web pack in config-overrides.js');
    return config;
}