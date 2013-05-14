define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
	(function(){
		Router = Backbone.Router.extend({
			routes: {
				'video/:id': 'watch'
			},

			test: function(){
				console.log('test');
			},

			watch: function(yt_video_id){
				videos.trigger('watch', yt_video_id);
			}
		});

		VideoRouter = new Router();
		Backbone.history.start();

	})();
	return Router;
});