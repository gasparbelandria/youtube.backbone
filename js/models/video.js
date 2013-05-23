define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
    (function(){
        Video = Backbone.Model.extend({
            initialize: function(){
                this.bind("error", function(model,error){
                    console.log(model);
                });
                this.set('duration', seconds2time (this.get('duration')));
                this.set('description', cut ( this.get('description'), 90 ));
                this.set('title', cut ( this.get('title'), 35 ));
                function seconds2time(seconds){
                    var hours   = Math.floor(seconds / 3600);
                    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
                    var seconds = seconds - (hours * 3600) - (minutes * 60);
                    var time = "";
                    if (hours != 0) {
                      time = hours+":";
                    }
                    if (minutes != 0 || time !== "") {
                      minutes = (minutes < 10 && time !== "") ? "0"+minutes : String(minutes);
                      time += minutes+":";
                    }
                    if (time === "") {
                      time = seconds+"s";
                    }
                    else {
                      time += (seconds < 10) ? "0"+seconds : String(seconds);
                    }
                    return time;
                };
                
                function cut(text, n){
                    var short = text.substr(0, n);
                    if (/^\S/.test(text.substr(n)))
                        return short.replace(/\s+\S*$/, "");
                    return short;
                };
                
            },
            defaults: {
                "id":null,
                "category":"",
                "time":"",
                "description":"",
                "title":"",
                "url":"",
                "thumbnail":"",
                "uploader":"",
                "viewCount":""
            },
            //url: "video/"
            sync: function(){
                return;
            }
        });
        //var video = new Video();
        return Video;
    })();
});