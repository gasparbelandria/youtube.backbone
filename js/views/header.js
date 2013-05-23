define([
	'jquery',
	'underscore',
	'backbone'
],function($, _, Backbone){
	$(function(){
		Header = Backbone.View.extend({
			el: $('#header'),
			template: 'header',
			initialize:function(){
				$("#header").html(this.render());
			},
			render:function(){
				console.log('rendering header');
			    var that = this;
			    $.get("./templates/" + this.template + ".html", function(template){
			    	alert($(template));
			    	/*
					var html = $(template).tmpl();
					alert(html);
					that.$el.html(html);
					console.log("html");
					*/
			    });
			    return this;
			}
		});
	});
	var header = new Header();
	return Header;
});