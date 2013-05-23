define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
    $(function($){
        ChannelView = Backbone.View.extend({
          initialize: function(){
          	//
          },
        });
        var channelview = new ChannelView();
        return ChannelView;
    });
});