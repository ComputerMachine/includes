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
    
    var addMetaData = function(item) {
        var title = item.snippet.title;
    },
    getStormDate = function(item) {
        var title = item.snippet.title;
        var afterOn = title.match(/(?<= on )(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday).*/);

        /* Couldn't find the keyword ' on ' followed by a day */
        if (!afterOn) return;
        
        var stormDate = new Date(afterOn[0]);
        if (isNaN(stormDate)) {
            /* This ain't the string we're looking for */
            return;
        }
        return stormDate;
    },
    isRelevantVideo = function(item) {
    /* Return true if video is a weather statement */
        /*
        Severity index:
            =< 2 Minor storm [Condition Yellow]
            >= 3 Major storm [Condition Red]
        */
        var keywords = [
		    "cindy day",
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
        
        /* Add severity index to video snippet */
        $.map(keywords, function(keyword, i) {
            if (title.toLowerCase().indexOf(keyword) >= 0) score++;
        });
        item.snippet.severity = score;
        item.snippet.arrival = getStormDate(item);

        /* If score has a positive value, it contains a keyword therefore it's a relevant video */
        return !!score;
    },
    getRecentVideos = function() {
        var maxAge = 5; // /* Retrieve videos less than maxAge days old */
        var url = "https://www.googleapis.com/youtube/v3/search";
        var key = "AIzaSyD6DTXB1EK6ugK4y-MF__mvV0oU8vRXydw";
        return $.getJSON(url, 
        {
            key: key,
            channelId: "UCx7jt4I-KPT6guTWwLxn50w",
            part: "snippet,id",
            order: "date",
            maxResults: 20
        })
        .then(function(response) {
            var now = Date.now();
            var maxAgeMilliseconds = maxAge * 24 * 60 * 60 * 1000;
            var cutoff = now - maxAgeMilliseconds;
            var stopAt = undefined;  // slice(0, undefined) = full array
            
            $.each(response.items, function(i, item) {
                var publishedDate = new Date(item.snippet.publishedAt);
                if (publishedDate < cutoff) {
                    stopAt = i;
                    return false;
                }
            });

            return response.items.slice(0, stopAt);
        })
        .then(videos => {
            return $.getJSON("https://www.googleapis.com/youtube/v3/videos", {
                key: key,
                id: "-H--E5xkGBM,159fXlZUAks,LheX9LRfst8",
                part: "snippet,id"
            })
            .then(response => {                
                return videos.concat(response.items);
            });
        });
    },
    setSeverityScore = function($elem) {
        var severity = $elem.data("severity");
        var yt = $("#yt-container").addClass("alert");
        severity <= 2 ? yt.addClass("condition-yellow") : yt.addClass("condition-red");
    },
    loadingVideo = function($elem) {
        $("<div/>", {id: "ytplayer"}).appendTo($elem);
        $("#ytplayer").wrap( $("<div/>", {id: "yt-container"}).css("display", "none") );
        var player;
        var handlers = {};
        handlers[YT.PlayerState.ENDED] = function(e) {
            player.loadVideoById({
                videoId: $elem.data("video-id")
            });            
            setSeverityScore($elem);
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
    
    task.fail(function() {
       $("#frankie-header").text("Failed to fetch videos from dogsandwolves");
        setTimeout(function() {
            $("#frankie-header").hide(1000);
        }, 2000);
    })        
    .done(function(videos) {
        /* Remove elements that don't have 'storm' keywords */
        var relevantVideos = $.grep(videos, isRelevantVideo);
        
        /* closest storm date to the current date goes first */
        relevantVideos.sort(function(a, b) {
            if (!a.snippet.arrival) {
                return 1;
            }
            if (!b.snippet.arrival) {
                return -1;
            }
            return b.snippet.arrival - a.snippet.arrival;
        });
        
        var today = new Date();
        $.each(relevantVideos, function() {
            var replaced = this.snippet.title.replace(/Headed Towards the Earth/i, 'to Hit the Earth');
            var changed = false;

            if (replaced != this.snippet.title) changed = true;

            var $weatherDiv = $("<div/>").text(replaced)
                .data({
                    "video-id": this.kind === "youtube#video" ? this.id : this.id.videoId,
                    "severity": changed ? 9000 : this.snippet.severity,
                    "arrival": this.snippet.arrival})
                .addClass("weather-report")
                .appendTo("#alerts");

            var arrivalDate = $weatherDiv.data("arrival");
            if (!arrivalDate) {
                return true;  // continue
            }

            if (today.toDateString() == arrivalDate.toDateString()) {
                /* hold on to yer butts */
                $weatherDiv.addClass("storm-today");
            } else if (arrivalDate > today) {
                /* you have no idea what's coming */
                $weatherDiv.addClass("storm-incoming");
            } else {
                var diffMilliseconds = Date.now() - arrivalDate;
                if (diffMilliseconds >= 2 * 24 * 60 * 60 * 1000) {
                    /* looks like we survived... for now.
                       the arrogance of man is thinking nature is in our control
                       and not the other way around */
                    $weatherDiv.addClass("storm-passed");
                }
            }
        });
        
        $(".weather-report").click(function() {
            if ($(this).hasClass("is-watching")) return;
            
            /* only play one video at a time, remove old yt-container and iframe and watching class */
            $("#alerts > .is-watching").stop()
                .removeClass("is-watching")
                .children("#yt-container").remove();
            
            var $this = $(this);
            TazGHelpers.whenYoutubeApiReady(function() {
				var freedomPlayer = YT.get("freedom-song");
				if (typeof freedomPlayer !== "undefined") {
					freedomPlayer.stopVideo();
				}
				$("#playing").hide();
                loadingVideo($this);
                $("#yt-container").show();//.slideToggle();
            });
            
            $(this).addClass("is-watching");
        });
        
    });    
});
