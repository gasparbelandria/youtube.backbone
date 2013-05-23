define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone, tpl){
        $(function(){
            VideoView = Backbone.View.extend({
                el:"#search-list",
                template: _.template( $('#results-template').html() ),
<<<<<<< HEAD
                initialize: function(){
                    //this.listenTo(this.model, 'change', this.render);
                    //this.listenTo(this.model, 'destroy', this.remove);
                },
                render: function(){
                    this.$el.append(this.template(this.model.toJSON()));
                    return this;
                },
=======
                /*
                events: {
                  'dragstart': 'prepareDrag'
                },
                */
                initialize: function(){
                    console.log("EN LA VISTA : VIDEO");
                    //this.listenTo(this.model, 'change', this.render);
                    //this.listenTo(this.model, 'destroy', this.remove);
                },

                render: function(){
                    //this.$el.html(this.template(this.model.toJSON()));
                    this.$el.append(this.template(this.model.toJSON()));
                    return this;
                },

                /*
                prepareDrag: function(e){
                  var url = "http://www.youtube.com/embed/" + this.model.get('id'),
                    style = "height:325px;width:420px;";
                    gila.connector.prepareDrag({
                        "event": e,
                        "title": this.model.get('title'),
                        "content": "<iframe src=\""+url+"\" style=\""+style+"\" />",
                        "source": {}
                    });
                },
                */

                clear: function(){
                    console.log("function clear");
                  this.model.destroy();
                }
>>>>>>> f06f711bec4efdcdc22c6e6f1094f3f0c101b495
            });
            return VideoView;
        });
    });