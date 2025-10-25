const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "sigae-lite-people": "http://localhost:4201/remoteEntry.js",    
    "sigae-lite-calendar": "http://localhost:4202/remoteEntry.js",    
    "sigae-lite-action-plan": "http://localhost:4203/remoteEntry.js",    
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
