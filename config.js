// Original concepts provided by Backbone Boilerplate project: https://github.com/tbranyen/backbone-boilerplate
requirejs.config({
  // Initialize the application with the main application file
  deps: ["main"],
  baseUrl: "js",
  paths: {
    // Libraries
    jquery            : "libs/jquery",
    underscore        : "libs/underscore",
    backbone          : "libs/backbone",
<<<<<<< HEAD
    paramModels       : "models/param",
    videoModels       : "models/video",
    videosViews       : 'views/videos',
    videoCollections  : 'collections/video',
    resultsViews      : 'views/results',
    channelModels     : "models/channel",
    channelsViews     : 'views/channels',
    channelCollections: 'collections/channel',
    resultsViews      : 'views/resultsChannel',    
=======
    videoModels       : "models/video",
    videosViews       : 'views/videos',
    videoCollections  : 'collections/video',
    resultsViews      : 'views/results'
>>>>>>> f06f711bec4efdcdc22c6e6f1094f3f0c101b495
  },
  shim: {
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    underscore: {
      exports: '_'
    }
  }
});
