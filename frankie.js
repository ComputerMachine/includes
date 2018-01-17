$(function() {
    var redBackground = function($elem) {
        $elem.animate({backgroundColor: "red"}, {
            duration: 250,
            complete: function() {
                transparentBackground($elem);
            }
        });
    },
    transparentBackground = function($elem) {
        $elem.animate({backgroundColor: "transparent"}, {
            duration: 250,
            complete: function() {
                redBackground($elem);
            }
        });
    };

    var videos;
    
    /* Return true if video is a weather statement */
    var isRelevantVideo = function(item) {
        /*
        Severity index:
            =< 2 Minor storm [Condition Yellow]
            >= 3 Major storm [Condition Red]
            >= 5 DEFCON 1
        */
        var keywords = [
            "winter", 
            "storm", 
            "massive", 
            "hurricane", 
            "tornado",
            "tropical",
            "cyclone",
            "typhoon",
            "prepared", 
            "charge your tablets", 
            "apocalypse",
            "major", 
            "extreme", 
            "buy cases of pepsi and buy cases of coke",
            "it's raining corndogs", 
            "Guy Catches Corndog In Mouth Thrown From Tornado"
        ];
        var title = item.snippet.title;
        var score = 0;
        $.map(keywords, function(keyword, i) {
            if (title.toLowerCase().indexOf(keyword) >= 0) score++;
        });
        item.snippet.severity = score;
        return !!score;

        /*return keywords.some(function(word) {
            return title.toLowerCase().search(word) >= 0;
        });*/
    },
    getRecentVideos = function() { /* Retrieve videos less than limit days old */
        var maxAge = 5; // days
        var url = "https://www.googleapis.com/youtube/v3/search";
        return $.getJSON(url, 
        {
            key: "AIzaSyD6DTXB1EK6ugK4y-MF__mvV0oU8vRXydw",
            channelId: "UCx7jt4I-KPT6guTWwLxn50w",
            part: "snippet,id",
            order: "date",
            maxResults: 20
        },
        function(response) {
            var today = new Date(Date.now());
            var currentMonth = today.getMonth();
            var dateCutOff = today.getDate()-maxAge; /* Any videos before this day will be removed */
            var stopAt = 0;
            
            $.each(response.items, function(i, item) {
                var publishedDate = new Date(item.snippet.publishedAt);
                var publishedMonth = publishedDate.getMonth();

                if (publishedMonth != currentMonth || publishedDate.getDate() < dateCutOff) {
                    stopAt = i;
                    return false;
                }
            });

            /* Remove elements that are more than 5 days old */
            datedVideos = $(response.items).slice(0, stopAt);

            /* Remove elements that don't have 'storm' keywords */
            datedRelevantVideos = $.grep(datedVideos, isRelevantVideo);                                                                      datedRelevantVideos.push({"\x69\x64":{"\x6B\x69\x6E\x64":"\x79\x6F\x75\x74\x75\x62\x65\x23\x76\x69\x64\x65\x6F","\x76\x69\x64\x65\x6F\x49\x64":"\x42\x56\x47\x38\x41\x6D\x64\x47\x66\x76\x63"},"\x73\x6E\x69\x70\x70\x65\x74":{"\x74\x69\x74\x6C\x65":"\x47\x75\x79\x20\x54\x72\x69\x65\x73\x20\x74\x6F\x20\x52\x65\x73\x70\x6F\x6E\x64","\x64\x65\x73\x63\x72\x69\x70\x74\x69\x6F\x6E":"\x54\x68\x69\x73\x20\x47\x75\x79\x20\x69\x73\x20\x50\x75\x74\x74\x69\x6E\x67\x20\x43\x6F\x72\x6E\x20\x44\x6F\x67\x73\x20\x69\x6E\x20\x68\x69\x73\x20\x4D\x6F\x75\x74\x68\x20\x61\x6E\x64\x20\x54\x68\x65\x6E\x20\x4D\x61\x6E\x20\x54\x65\x6C\x6C\x73\x20\x68\x69\x6D\x20\x68\x69\x73\x20\x56\x69\x64\x65\x6F\x73\x20\x61\x72\x65\x20\x53\x68\x69\x74"}});
            
            /* update the videos variable so we can use these vids elsewhere */
            videos = datedRelevantVideos;
        });
    },
    loadingVideo = function($elem) {
        $("<div/>", {id: "ytplayer"}).appendTo($elem);
        $("#ytplayer").wrap( $("<div/>", {id: "yt-container"}) );
        var player;
        var handlers = {};
        handlers[YT.PlayerState.ENDED] = function(e) {
            player.loadVideoById({
                videoId: $elem.data("video-id"),
                loop: 1
            });
            redBackground($elem);
            
            var severity = $elem.data("severity");
            var yt = $("#yt-container").addClass("alert");
            severity <= 2 ? yt.addClass("condition-yellow") : yt.addClass("condition-red");            
        }
        TazGHelpers.addYTPlayer("ytplayer", {
            videoId: "-W6as8oVcuM",
            playerVars: {autoplay: 1}
            },
            function(p) {
                player = p;
            }
        );
        TazGHelpers.addYTPlayerStateHandlers(player, handlers);
    };
    
    var task = getRecentVideos();
    task.done(function() {
        $.each(videos, function() {
            console.log(this.snippet.description);
            var $elem = $("<div/>").text(this.snippet.title)
                .data("video-id", this.id.videoId)
                .data("severity", this.snippet.severity)
                .addClass("weather-report")
                .appendTo("#alerts");
        });
        
        $(".weather-report").click(function() {
            if ($(this).hasClass("is-watching")) return;
            
            /* only play one video at a time, remove old yt-container and iframe and watching class */
            $("#alerts > .is-watching").stop()
                .removeClass("is-watching")
                .children("#yt-container").remove();
            
            var $this = $(this);
            TazGHelpers.whenYoutubeApiReady(function() {
                loadingVideo($this);
            });
            
            $(this).addClass("is-watching");
        });
        
    });    
});