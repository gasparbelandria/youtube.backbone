define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
        $(function(){
            ChannelView = Backbone.View.extend({
                el:"#search-list",
                template: _.template( $('#channel-template').html() ),
                initialize: function(){
                    //console.log("view channel");
                    //
                },
                render: function(){
                    this.$el.append(this.template(this.model.toJSON()));
                    return this;
                },
            });
            return ChannelView;
        });
    });