define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
    $(function($){
        AppView = Backbone.View.extend({

          el: '#youtube',

          events: {
            'keypress #search_query': 'searchOnEnter',
            'click #search-btn': 'search',
          },

          initialize: function(){
            this.$search = this.$('#search_query');
            this.$videos = this.$('#search-results');
            //this.$viewer = this.$('#video-viewer');
            //this.$wrapper = this.$('#video-wrapper');

            this.listenTo(videos, 'add', this.addOne);
            //this.listenTo(app.videos, 'reset', this.addAll);
            //this.listenTo(app.videos, 'all', this.render);
            //this.listenTo(app.videos, 'watch', this.watch);
          },

          render: function(){

          },

          addOne: function(video){
            var view = new VideoView({ model: video });
            this.$videos.append(view.render().el);
          },

          addAll: function(){
            this.$videos.html('');
            videos.each(this.addOne, this);
          },

          search: function(){
            console.log("function search");
            var q = this.$search.val().trim();

            if(!q){
              return;
            }

            console.log("buscando... "+q);
            $.ajax({
              type: "GET",
              url: 'http://gdata.youtube.com/feeds/api/videos?q='+q+'&format=5&max-results=20&v=2&alt=jsonc',
              dataType:"jsonp",
              success: $.proxy(this.handleYoutubeResponse, this)
            });

            this.$search.val('');
          },

          searchOnEnter: function(e){
          console.log("buscando enter");
            if(e.which !== "13"){
              return;
            }

            this.search();
          },

          handleYoutubeResponse: function(response){
            var results = response.data.items;
            if(!results || results.length < 1){
              this.$videos.text('No videos found');
              return;
            }

            var numResults = results.length;

            for(var i = 0; i < numResults; i++){
              videos.create(results[i]);
            }

            this.$search.val('');
          },

          watch: function(yt_video_id){
            var url = "http://www.youtube.com/embed/" + yt_video_id,
              style = "height:325px;width:420px;";

            this.$viewer.show();
            this.$videos.hide();
            this.$wrapper.html('<iframe id="video" src="'+url+'" style="'+style+'" />');
          },

          stopWatch: function(){
            this.$viewer.hide();
            this.$videos.show();
          }
        });
        var appview = new AppView();
        return AppView;
    });
});