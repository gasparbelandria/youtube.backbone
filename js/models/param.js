define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){
	(function(){
		Param = Backbone.Model.extend({
			defaults:{
				validPagination: false,
				api:'',
				start_index:'',
				max_results:'',
				q:'',
				alt:'',
				format:'',
				v:'',
				region:'',
				use_token:'',
				functions:''
			},
			initialize: function(){
				this.on("change", function(){
					if (this.get("start_index") > 1){
			            var parameters = param.get("api");
			                parameters = parameters+"?start-index="+param.get("start_index");
			                parameters = parameters+"&max-results="+param.get("max_results");
			                if(param.get("q")!=""){parameters = parameters+"&q="+param.get("q");}
			                if(param.get("format")!=""){parameters = parameters+"&format="+param.get("format");}
			                if(param.get("region")!=""){parameters = parameters+"&region="+param.get("region");}
			                parameters = parameters+"&v="+param.get("v");
			                parameters = parameters+"&alt="+param.get("alt");
			        	if (this.get("start_index")<=101){
				            $.ajax({
				              type: "GET",
				              url: parameters,
				              dataType:"jsonp",
				              success: $.proxy(this.handleRePaging, this)
				            });
			        	}
					}
				});
			},
			handleRePaging: function(response){
				var results = response.data.items;
				if(!results || results.length < 1){
					//this.$videos.html('No videos found');
					return;
				}
				var numResults = results.length;
				for(var i = 0; i < numResults; i++){
					videos.create(results[i]);
				}
			},
		});
		param = new Param();
	})();
})