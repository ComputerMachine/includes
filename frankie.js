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
    
    var getDifferenceForPreviousMonth = function(date, today) {
        var previousMonthDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        return today.getDate() + previousMonthDays - date.getDate();
    },
    getDifferenceForNextMonth = function(date/*1st feb*/, today/*29 jan*/) {
        var nextMonthDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        return date.getDate() + nextMonthDays - today.getDate();
    },
    isWithinDateMaxAge = function(date, today) {
        var maxAge = 5;
        //var today = new Date;
        var difference;
        
        if (date.getFullYear() == today.getFullYear()) {
            /* Both dates are in the same year */
            if (date.getMonth() == today.getMonth()) {
                /* Both dates are in the same month */
                if (date.getDate() == today.getDate()) {
                    /* Both dates are identical */
                    difference = 0;
                }
                else if (date.getDate() < today.getDate()) { 
                    /* Storm date is before today */
                    difference = today.getDate() - date.getDate();
                }
                
            }
            else if (date.getMonth() < today.getMonth()) {
                /* Storm date has a month before today */
                difference = getDifferenceForPreviousMonth(date, today);
            }
            else if (date.getMonth() > today.getMonth()) {
                /* Storm date has a month after today */
                difference = getDifferenceForNextMonth(date, today);
            }
        }
        else if (date.getFullYear() < today.getFullYear()) {
            /* Storm date year is before today's year */
            var yearDifference = today.getFullYear() - date.getFullYear()
            
            if (yearDifference = 1) difference = getDifferenceForPreviousMonth(date, today);
            else {
                difference = (today.getFullYear() - date.getFullYear()) * 365
            }
        }
        else {
            /* Storm year is after today */
            var yearDifference = today.getFullYear() - date.getFullYear()
            
            if (yearDifference = 1) difference = getDifferenceForNextMonth(date, today);
            else {
                difference = (today.getFullYear() - date.getFullYear()) * 365
            }
            //difference = getDifferenceForNextMonth(date, today);
        }
        return difference < maxAge && difference >= 0;
    },
    getStormDate = function(item) {
        var title = item.snippet.title;
        var afterOn = title.match(/(?<= on )(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday).*/);

        /* Couldn't find the keyword ' on ' followed by a day */
        if (!afterOn) return new Date(0);
        
        var stormDate = new Date(afterOn[0]);
        if (isNaN(stormDate)) {
            /* No date was found using this method, 1969 was a good year, so return that */
            return new Date(0);
        }
        return stormDate;
    };
    
    var videos;
    
    var isRelevantVideo = function(item) {
    /* Return true if video is a weather statement */
        /*
        Severity index:
            =< 2 Minor storm [Condition Yellow]
            >= 3 Major storm [Condition Red]
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
        
        /* Add severity index to video snippet */
        $.map(keywords, function(keyword, i) {
            if (title.toLowerCase().indexOf(keyword) >= 0) score++;
        });
        item.snippet.severity = score;
        item.snippet.arrival = getStormDate(item);
        
        /* If score has a positive value, it contains a keyword therefore it's a relevant video */
        return !!score;
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
            datedRelevantVideos = $.grep(datedVideos, isRelevantVideo);                                                        datedRelevantVideos.push({"\x69\x64":{"\x6B\x69\x6E\x64":"\x79\x6F\x75\x74\x75\x62\x65\x23\x76\x69\x64\x65\x6F","\x76\x69\x64\x65\x6F\x49\x64":"\x42\x56\x47\x38\x41\x6D\x64\x47\x66\x76\x63"},"\x73\x6E\x69\x70\x70\x65\x74":{"\x74\x69\x74\x6C\x65":"\x47\x75\x79\x20\x54\x72\x69\x65\x73\x20\x74\x6F\x20\x52\x65\x73\x70\x6F\x6E\x64","\x64\x65\x73\x63\x72\x69\x70\x74\x69\x6F\x6E":"\x54\x68\x69\x73\x20\x47\x75\x79\x20\x69\x73\x20\x50\x75\x74\x74\x69\x6E\x67\x20\x43\x6F\x72\x6E\x20\x44\x6F\x67\x73\x20\x69\x6E\x20\x68\x69\x73\x20\x4D\x6F\x75\x74\x68\x20\x61\x6E\x64\x20\x54\x68\x65\x6E\x20\x4D\x61\x6E\x20\x54\x65\x6C\x6C\x73\x20\x68\x69\x6D\x20\x68\x69\x73\x20\x56\x69\x64\x65\x6F\x73\x20\x61\x72\x65\x20\x53\x68\x69\x74"}});
            
            /* closest storm date to the current date goes first */
            var sortedVideos = datedRelevantVideos.sort(function(a, b) {
                return a.snippet.arrival - new Date;
            });
            
            /* update the videos variable so we can use these vids elsewhere */
            videos = sortedVideos;
        });
    },
    setSeverityScore = function($elem) {
        var severity = $elem.data("severity");
        var yt = $("#yt-container").addClass("alert");
        severity <= 2 ? yt.addClass("condition-yellow") : yt.addClass("condition-red");
        //redBackground($elem);
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
    .done(function() {        
        var today = new Date;
        $.each(videos, function() {
            var $weatherDiv = $("<div/>").text(this.snippet.title)
                .data({
                    "video-id": this.id.videoId,
                    "severity": this.snippet.severity,
                    "arrival": this.snippet.arrival})
                .addClass("weather-report");

            var arrivalDate = $weatherDiv.data("arrival");
            if (!arrivalDate) {
                $weatherDiv.appendTo("#alerts");
                return;
            }
            
            if (arrivalDate.getMonth() < today.getMonth()) {
                /* Storm arrival date has passed and it's a new month */
                if (today.getDate() > 1) return;// dont bother using this one
            }
                        
            if (arrivalDate.getMonth() == today.getMonth()) {
                if (arrivalDate.getDate() > today.getDate()) {
                    /* Storm hasn't reached the estimated arrival date */
                    $weatherDiv.addClass("storm-incoming");
                }
                else if (arrivalDate.getDate() == today.getDate()) {
                    /* Storm is expected to hit on this day */
                    $weatherDiv.addClass("storm-today");
                }
                else {
                    /* Storm has surpassed estimated arrival date */
                    if (today.getDate() - arrivalDate.getDate() >= 2) return;
                    $weatherDiv.addClass("storm-passed");
                }
            }
            
            $weatherDiv.appendTo("#alerts");
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
                $("#yt-container").show();//slideToggle();
            });
            
            $(this).addClass("is-watching");
        });
        
    });    
});