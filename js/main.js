<<<<<<< HEAD
require([
	'jquery', 
	'underscore', 
	'backbone', 
	'models/param', 
	'models/video', 
	'views/videos', 
	'collections/video', 
	'views/results', 
	'models/channel', 
	'views/channels', 
	'collections/channel', 
	'views/resultsChannel', 	
	'routers/video'],
function   ($, _, backbone, paramModels, videoModels, videosViews, videoCollections, resultsViews, channelModels, channelsViews, channelCollections, resultsChannelViews, videoRouters) {
	console.log("JQuery, Underscore, Backbone and my JS are ready for be used");
	/*
    tpl.loadTemplates(['header', 'results'], function() {
    	console.log("inside main");
    });
	*/

=======
require(['jquery', 'underscore', 'backbone', 'models/video', 'views/videos', 'collections/video', 'views/results', 'routers/video'],
function   ($, _, backbone, videoModels, videosViews, videoCollections, resultsViews, videoRouters) {
	console.log("JQuery, Backbone, Underscore and my JS are ready for be used");
>>>>>>> f06f711bec4efdcdc22c6e6f1094f3f0c101b495
});



