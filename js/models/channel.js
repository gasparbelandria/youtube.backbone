define([
  'jquery',
  'underscore',
  'backbone',
  'utils/pretty',
], function($, _, Backbone){
    (function(){
        Channel = Backbone.Model.extend({
            initialize: function(){
                this.bind("error", function(model,error){
                    console.log(model);
                });
                this.set('title', parseTitle (this.get('title')));
                this.set('media$group', parseMedia (this.get('media$group')));
                this.set('author', parseAuthor (this.get('author')));
                this.set('yt$channelStatistics', parseStats (this.get('yt$channelStatistics')));
                this.set('updated', parseUpdated (this.get('updated')));
                this.set('yt$channelId', channelId (this.get('yt$channelId')));
                function parseTitle(title){return title.$t;};
                function parseMedia(media){$thumb = media;return $thumb.media$thumbnail[0].url;};
                function parseAuthor(author){return author[0].name.$t;};
                function parseStats(stats){return stats.totalUploadViewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");};
                function parseUpdated(updated){return updated.$t;};
                function channelId(id){return id.$t;};
            },
            defaults: {
                "title":"",
                "media":""
            },
            sync: function(){
                return;
            }
        });
        return Channel;
    })();
});