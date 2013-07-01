define([
	'jquery',
	'underscore',
	'backbone'
],function($, _, Backbone){
	$(function(){

		TemplateManager = {
			templates: {},
			get: function(id, callback){
				var template = this.templates[id];
				if (template) {
					callback(template);
				} else {
					var that = this;
					$.get("./templates/" + id + ".html", function(template){
						var $tmpl = $(template);
						that.templates[id] = $tmpl;
						callback($tmpl);
					});
				}
			}
		}

		Header = Backbone.View.extend({
			el: $('#header'),
			template: 'header',
			initialize:function(){
				$("#header").html(this.render().el);
			},		 
			render: function(){
				var that = this;
				TemplateManager.get(this.template, function(template){
					var html = $(template);
					that.$el.append(html);
				});
				return this;
			}
			});		
		/*
		Header = Backbone.View.extend({
			el: $('#header'),
			template: 'header',
			initialize:function(){
				$("#header").html(this.render().el);
			},
			render:function(){
			    var that = this;
			    $.get("./templates/" + this.template + ".html", function(template){
					var html = $(template);
					that.$el.append(html);
			    });
			    return this;
			},
		});
		*/
	});
	var header = new Header();
	return Header; // hide
});