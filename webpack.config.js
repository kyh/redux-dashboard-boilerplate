var path = require('path');
var getConfig = require('hjs-webpack');
var appConfig = require('./webpack/config');

var config = getConfig({
  // entry point for the app
  in: 'src/app.js',
  out: 'public',
  // This will destroy and re-create your
  // `out` folder before building so you always
  // get a fresh folder.
  clearBeforeBuild: '!(images|static)',
  html: function(context) {
    return {
      'index.html': context.defaultTemplate({
        html: appConfig.rootHTML,
        title: appConfig.title,
        head: appConfig.favicon,
        metaTags: {
          description: appConfig.description
        }
      })
    }
  }
});

config.resolve.root = [
  path.resolve('./src/redux/modules'),
  path.resolve('./src/helpers'),
  path.resolve('./src/static')
];

module.exports = config;
