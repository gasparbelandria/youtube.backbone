define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/channel.html'
], function($, _, Backbone, tpl){
        $(function(){
            ChannelView = Backbone.View.extend({
                el:"#search-list",
                //template: _.template( $('#channel-template').html() ),
                template: _.template( tpl ),
                initialize: function(){
                    //console.log("view channel");
                },
                render: function(){
                    this.$el.append(this.template(this.model.toJSON()));
                    return this;
                },
            });
            return ChannelView;
        });
    });