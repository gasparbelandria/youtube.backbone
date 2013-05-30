define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
    $(function($){
        AppViewChannel = Backbone.View.extend({
          el: '#youtube',
          events: {
            'click #yt-more-recommendations-musicians': 'searchMusicians',
            'click #yt-more-recommendations-comedians': 'searchComedians',
            'click #yt-more-recommendations-directors': 'searchDirectors',
            'click #yt-more-recommendations-gurus': 'searchGurus',
            'click #yt-more-recommendations-partners': 'searchPartners',
            'click #yt-more-recommendations-sponsors': 'searchSponsors',
            'click #yt-more-recommendations-reporters': 'searchReporters',
          },
          initialize: function(){
            $(window).scroll(this.onScrollPage); 
            this.$channels  = this.$('#search-results');
            this.listenTo(channels, 'add', this.addChannel);
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

          addChannel: function(channel){
            var view = new ChannelView({ model: channel });
            this.$channels.append(view.render().el);
          },
          /*
           * SEARCH MUSICIANS
           */
          searchMusicians: function(){
            param.set({
                    validPagination:true,
                    api:'https://gdata.youtube.com/feeds/api/channelstandardfeeds/US/most_viewed_Musicians',
                    start_index:'1',
                    max_results:'20',
                    q:'',
                    alt:'json',
                    format:'',
                    v:'2',
                    region:'',
                    use_token:'0',
                    functions:'channel'});
            this.gotoSearch();
          },
          /*
           * SEARCH COMEDIANS
           */
          searchComedians: function(){
            param.set({
                    validPagination:true,
                    api:'https://gdata.youtube.com/feeds/api/channelstandardfeeds/US/most_viewed_Comedians',
                    start_index:'1',
                    max_results:'20',
                    q:'',
                    alt:'json',
                    format:'',
                    v:'2',
                    region:'',
                    use_token:'0',
                    functions:'channel'});
            this.gotoSearch();
          },

          /*
           * SEARCH DIRECTORS
           */
          searchDirectors: function(){
            param.set({
                    validPagination:true,
                    api:'https://gdata.youtube.com/feeds/api/channelstandardfeeds/US/most_viewed_Directors',
                    start_index:'1',
                    max_results:'20',
                    q:'',
                    alt:'json',
                    format:'',
                    v:'2',
                    region:'',
                    use_token:'0',
                    functions:'channel'});
            this.gotoSearch();
          },
          /*
           * SEARCH GURUS
           */
          searchGurus: function(){
            param.set({
                    validPagination:true,
                    api:'https://gdata.youtube.com/feeds/api/channelstandardfeeds/US/most_viewed_Gurus',
                    start_index:'1',
                    max_results:'20',
                    q:'',
                    alt:'json',
                    format:'',
                    v:'2',
                    region:'',
                    use_token:'0',
                    functions:'channel'});
            this.gotoSearch();
          },
          /*
           * SEARCH PARTNERS
           */
          searchPartners: function(){
            param.set({
                    validPagination:true,
                    api:'https://gdata.youtube.com/feeds/api/channelstandardfeeds/US/most_viewed_Partners',
                    start_index:'1',
                    max_results:'20',
                    q:'',
                    alt:'json',
                    format:'',
                    v:'2',
                    region:'',
                    use_token:'0',
                    functions:'channel'});
            this.gotoSearch();
          },
          /*
           * SEARCH SPONSORS
           */
          searchSponsors: function(){
            param.set({
                    validPagination:true,
                    api:'https://gdata.youtube.com/feeds/api/channelstandardfeeds/US/most_viewed_Sponsors',
                    start_index:'1',
                    max_results:'20',
                    q:'',
                    alt:'json',
                    format:'',
                    v:'2',
                    region:'',
                    use_token:'0',
                    functions:'channel'});
            this.gotoSearch();
          },
          /*
           * SEARCH REPORTERS
           */
          searchReporters: function(){
            param.set({
                    validPagination:true,
                    api:'https://gdata.youtube.com/feeds/api/channelstandardfeeds/US/most_viewed_Reporters',
                    start_index:'1',
                    max_results:'20',
                    q:'',
                    alt:'json',
                    format:'',
                    v:'2',
                    region:'',
                    use_token:'0',
                    functions:'channel'});
            this.gotoSearch();
          },
          gotoSearch: function(){
            $("#search-list").html("");
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
              success: $.proxy(this.handleChannel, this)
            });
          },

          handleChannel: function(response){
            var results = response.feed.entry;
            if(!results || results.length < 1){
              return;
            }
            var numResults = results.length;
            for(var i = 0; i < numResults; i++){
              channels.reset();
              channels.create(results[i]);
            }
          },

        });
        var appviewchannel = new AppViewChannel();
        return AppViewChannel;
    });
});