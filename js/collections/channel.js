define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
	(function(){
		Channels = Backbone.Collection.extend({
			model: Channel
		});
		channels = new Channels();
	})();
	//return Videos;
});