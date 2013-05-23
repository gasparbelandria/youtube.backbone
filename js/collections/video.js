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
<<<<<<< HEAD
	//return Videos;
=======
	return Videos;
>>>>>>> f06f711bec4efdcdc22c6e6f1094f3f0c101b495
});