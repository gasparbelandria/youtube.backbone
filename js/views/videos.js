define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone, tpl){
        $(function(){
            VideoView = Backbone.View.extend({
                el:"#search-list",
                template: _.template( $('#results-template').html() ),
                initialize: function(){
                    //this.listenTo(this.model, 'change', this.render);
                    //this.listenTo(this.model, 'destroy', this.remove);
                },
                render: function(){
                    this.$el.append(this.template(this.model.toJSON()));
                    return this;
                },
            });
            return VideoView;
        });
    });