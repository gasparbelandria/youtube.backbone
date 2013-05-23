define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
    (function(){
        Video = Backbone.Model.extend({
            initialize: function(){
<<<<<<< HEAD
=======
                console.log("EN EL MODELO");
>>>>>>> f06f711bec4efdcdc22c6e6f1094f3f0c101b495
                this.bind("error", function(model,error){
                    console.log(model);
                });
                this.set('duration', seconds2time (this.get('duration')));
<<<<<<< HEAD
                this.set('description', cut ( this.get('description'), 90 ));
                this.set('title', cut ( this.get('title'), 35 ));
=======
>>>>>>> f06f711bec4efdcdc22c6e6f1094f3f0c101b495
                function seconds2time(seconds){
                    var hours   = Math.floor(seconds / 3600);
                    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
                    var seconds = seconds - (hours * 3600) - (minutes * 60);
                    var time = "";
<<<<<<< HEAD
=======

>>>>>>> f06f711bec4efdcdc22c6e6f1094f3f0c101b495
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
<<<<<<< HEAD
                };
                
                function cut(text, n){
                    var short = text.substr(0, n);
                    if (/^\S/.test(text.substr(n)))
                        return short.replace(/\s+\S*$/, "");
                    return short;
                };
                
=======
                }
>>>>>>> f06f711bec4efdcdc22c6e6f1094f3f0c101b495
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