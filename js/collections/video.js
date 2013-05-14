define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
	(function(){
		Videos = Backbone.Collection.extend({
			model: Video
		});
		videos = new Videos();
	})();
	return Videos;
});