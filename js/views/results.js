define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/more.html'
], function($, _, Backbone, tpl){
    $(function($){
        AppView = Backbone.View.extend({
          el: '#youtube',
          // templateMore: _.template( $('#more-template').html() ),
          templateMore: _.template( tpl ),
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
            'click #video': 'viewVideo',
            'click #channel': 'searchChannel',
          },
          initialize: function(){
            $(window).scroll(this.onScrollPage);
            this.$videos    = this.$('#search-results');
            this.listenTo(videos, 'add', this.addOne);
          },
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
            console.log(video)
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
            var q = $('#search_query').val().trim(); //this.$search.val().trim();  
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
                if(param.get("start_index")!=""){parameters = parameters+"?start-index="+param.get("start_index");}
                if(param.get("max_results")!=""){parameters = parameters+"&max-results="+param.get("max_results");}
                if(param.get("q")!=""){parameters = parameters+"&q="+param.get("q");}
                if(param.get("format")!=""){parameters = parameters+"&format="+param.get("format");}
                if(param.get("alt")!=""){parameters = parameters+"&alt="+param.get("alt");}
                if(param.get("region")!=""){parameters = parameters+"&region="+param.get("region");}
                if(param.get("v")!=""){parameters = parameters+"&v="+param.get("v");}
            $.ajax({
              type: "GET",
              url: parameters,
              dataType:"jsonp",
              success: $.proxy(this.handleYoutubeResponse, this)
            });
          },
          searchOnEnter: function(e){
            if(e.which != "13")return;
            this.search();
          },

          handleYoutubeResponse: function(response){
            if (response.data.items){
              var results = response.data.items;
            }else{
              var results = response;
            }
            if(!results || results.length < 1){
              this.$videos.text('No videos found');
              return;
            }

            var numResults = results.length;
            for(var i = 0; i < numResults; i++){
              videos.reset();
              videos.create(results[i]);
            }
          },

          /*
           * SEARCH ANY CHANNEL
           */
          searchChannel:function(channel){
            $("#search-list").html("");
            /*
            //      https://gdata.youtube.com/feeds/api/users/userId/uploads
            var q = channel.currentTarget.getAttribute('channelId');
            var api = 'https://gdata.youtube.com/feeds/api/users/'+q+'/uploads';
            */
            $('#search_query').val(channel.currentTarget.getAttribute('author'));
            this.search();
          },

          viewVideo: function(video){
            /*
             * I will try to make it more elegant with jquery, but this is what I came up so far
             */
            if ($('#videoDetail').length)$('#videoDetail').remove();
            var style = "width:100%;height:425px;border:10px;margin-top:2px;";
            var media = video.currentTarget.getAttribute('videourl');
            var sp1 = document.createElement("iframe");
                sp1.src=media;
                sp1.width="100%";
                sp1.height="425px";
                sp1.style=style;
                sp1.id="videoDetail";
            var sp2 = video.currentTarget;
            var parentDiv = sp2.parentNode;
            parentDiv.insertBefore(sp1, sp2);
            var scroll = $('#videoDetail').offset().top - 10;
            $("html, body").animate({ 
            scrollTop: scroll
            }, 500);
          }
        });
        var appview = new AppView();
        return AppView;
    });
});