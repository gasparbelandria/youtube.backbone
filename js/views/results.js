define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
    $(function($){
        AppView = Backbone.View.extend({
          el: '#youtube',
          templateMore: _.template( $('#more-template').html() ),
          events: {
            'keypress #search_query': 'searchOnEnter',
            'click #search-btn': 'search',
            'click #more':'showMore',
            'click #yt-more-popular':'searchMorePopular',
            'click #yt-more-movies':'searchMovies',   
            'click #yt-more-sport':'searchSport',
            'click #yt-more-music':'searchMusic',
            'click #yt-more-news':'searchNews',
            'click #yt-more-gaming':'searchGaming',
          },
          initialize: function(){
            $(window).scroll(this.onScrollPage); 
            this.$search  = this.$('#search_query');
            this.$videos  = this.$('#search-results');

            this.listenTo(videos, 'add', this.addOne);
            //this.listenTo(app.videos, 'reset', this.addAll);
            //this.listenTo(app.videos, 'all', this.render);
            //this.listenTo(app.videos, 'watch', this.watch);
          },

          /*
          channels - 
          showMore: function(){
              $("#search-list").html("");
              $("#search-list").append(this.templateMore());
          },
          */

          showMore: function(){
              $("#search-list").html("");
              $("#search-list").append(this.templateMore());
          },
          
          onScrollPage: function(){
            if(!param.get("validPagination"))return;
            var cScroll = 0;  
            //Final page point
            var cy = $(window).scrollTop() + $(window).height();        
            if((cy - cScroll) > 0) { //Only firing when going downwards
                //console.log('cy: '+cy);
                var bottom = $(document).height();
                if(bottom - cy < 5) {  //Load more results
                    param.set("start_index", eval(param.get("start_index"))+20);
                }
            }
            cScroll = cy;
          },

          render: function(){

          },

          addOne: function(video){
            var view = new VideoView({ model: video });
            this.$videos.append(view.render().el);
          },

          addAll: function(){
          console.log("i was here");
            this.$videos.html('');
            videos.each(this.addOne, this);
          },
          /*
           * SEARCH
           */
          search: function(){
            $("#search-list").html("");
            var q = this.$search.val().trim();
            if(!q){
              return;
            }
            param.set({
                    validPagination:true,
                    api:'https://gdata.youtube.com/feeds/api/videos',
                    start_index:'1',
                    max_results:'20',
                    q:q,
                    alt:'jsonc',
                    format:'5',
                    v:'2',
                    region:'',
                    use_token:'0',
                    functions:'search'});
            this.gotoSearch();
          },
          /*
           * MOST POPULAR
           */
          searchMorePopular: function(){
            $("#search-list").html("");
            param.set({
                    validPagination:true,
                    api:'https://gdata.youtube.com/feeds/api/standardfeeds/most_popular',
                    start_index:'1',
                    max_results:'20',
                    q:'',
                    alt:'jsonc',
                    format:'',
                    v:'2',
                    region:'',
                    use_token:'0',
                    functions:'most_popular'});
            this.gotoSearch();
          },
          /*
           * SEARCH MOVIES
           */
          searchMovies:function(){
            $("#search-list").html("");            
            param.set({
                    validPagination:true,
                    api:'https://gdata.youtube.com/feeds/api/charts/movies/trending',
                    start_index:'1',
                    max_results:'20',
                    q:'',
                    alt:'jsonc',
                    format:'',
                    v:'2',
                    region:'US',
                    use_token:'0',
                    functions:'movies'});
            this.gotoSearch();
          },
          /*
           * SEARCH SPORT
           */
          searchSport:function(){
            $("#search-list").html("");
            param.set({
                    validPagination:true,
                    api:'https://gdata.youtube.com/feeds/api/standardfeeds/top_rated_Sports',
                    start_index:'1',
                    max_results:'20',
                    q:'',
                    alt:'jsonc',
                    format:'',
                    v:'2',
                    region:'',
                    use_token:'0',
                    functions:'sport'});
            this.gotoSearch();
          },
          /*
           * SEARCH MUSIC
           */
          searchMusic:function(){
            $("#search-list").html("");            
            param.set({
                    validPagination:true,
                    api:'https://gdata.youtube.com/feeds/api/standardfeeds/top_rated_Music',
                    start_index:'1',
                    max_results:'20',
                    q:'',
                    alt:'jsonc',
                    format:'',
                    v:'2',
                    region:'',
                    use_token:'0',
                    functions:'music'});
            this.gotoSearch();
          },
          /*
           * SEARCH NEWS
           */
          searchNews:function(){
            $("#search-list").html("");            
            param.set({
                    validPagination:true,
                    api:'https://gdata.youtube.com/feeds/api/standardfeeds/top_rated_News',
                    start_index:'1',
                    max_results:'20',
                    q:'',
                    alt:'jsonc',
                    format:'',
                    v:'2',
                    region:'',
                    use_token:'0',
                    functions:'music'});
            this.gotoSearch();
          },
          /*
           * SEARCH GAMING
           */
          searchGaming:function(){
            $("#search-list").html("");            
            param.set({
                    validPagination:true,
                    api:'https://gdata.youtube.com/feeds/api/standardfeeds/top_rated_Games',
                    start_index:'1',
                    max_results:'20',
                    q:'',
                    alt:'jsonc',
                    format:'',
                    v:'2',
                    region:'',
                    use_token:'0',
                    functions:'music'});
            this.gotoSearch();
          },
          gotoSearch: function(){
            var parameters = param.get("api");
                parameters = parameters+"?start-index="+param.get("start_index");
                parameters = parameters+"&max-results="+param.get("max_results");
                if(param.get("q")!=""){parameters = parameters+"&q="+param.get("q");}
                if(param.get("format")!=""){parameters = parameters+"&format="+param.get("format");}
                if(param.get("region")!=""){parameters = parameters+"&region="+param.get("region");}
                parameters = parameters+"&v="+param.get("v");
                parameters = parameters+"&alt="+param.get("alt");
            $.ajax({
              type: "GET",
              url: parameters,
              dataType:"jsonp",
              success: $.proxy(this.handleYoutubeResponse, this)
            });
          },

          searchOnEnter: function(e){
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

            videos.reset();
            var numResults = results.length;
            for(var i = 0; i < numResults; i++){
              videos.create(results[i]);
            }
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