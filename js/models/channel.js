define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
    (function(){
        Channel = Backbone.Model.extend({
            initialize: function(){
                this.bind("error", function(model,error){
                    console.log(model);
                });
            },
            defaults: {
                "name":"",
                "thumb":"",
                "viewCount":""
            },
            sync: function(){
                return;
            }
        });
        return Channel;
    })();
});