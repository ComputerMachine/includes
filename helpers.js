if (typeof TazGHelpers == "undefined") {
    var TazGHelpers = (function() {
        var youtubeApiSrc = "https://www.youtube.com/iframe_api";

        var defaultYTPlayerOptions = {
            width: 640,
            height: 390,
            playerVars: {
                showinfo: 0,
                controls: 0,
                rel: 0,
                iv_load_policy: 3
            }
        };

        var self = {
			twittilate: function(element, content) {
				var shadow = element;//.attachShadow({ mode: 'open' });
				
				shadow.innerHTML = '<style type="text/css">@import url("https://ton.twimg.com/tfw/css/syndication_bundle_v1_d5124b15971f6f8106664fa2bd57d9d6f8256356.css");</style> \
<style type="text/css">.SandboxRoot { display: none; }</style> \
<div data-twitter-event-id="0" class="SandboxRoot is-touch env-bp-350" style="position: relative;"><div class="EmbeddedTweet js-clickToOpenTarget" data-click-to-open-target="https://twitter.com/neiltyson/status/850554635467333633" data-iframe-title="Twitter Tweet" data-dt-full="%{hours12}:%{minutes} %{amPm} - %{day} %{month} %{year}" data-dt-months="Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec" data-dt-am="AM" data-dt-pm="PM" data-dt-now="now" data-dt-s="s" data-dt-m="m" data-dt-h="h" data-dt-second="second" data-dt-seconds="seconds" data-dt-minute="minute" data-dt-minutes="minutes" data-dt-hour="hour" data-dt-hours="hours" data-dt-abbr="%{number}%{symbol}" data-dt-short="%{day} %{month}" data-dt-long="%{day} %{month} %{year}" data-scribe="page:tweet" id="twitter-widget-0" lang="en" data-twitter-event-id="1"> <div class="EmbeddedTweet-tweet"> <blockquote class="Tweet h-entry js-tweetIdInfo subject expanded is-deciderHtmlWhitespace" cite="https://twitter.com/neiltyson/status/850554635467333633" data-tweet-id="850554635467333633" data-scribe="section:subject"> <div class="Tweet-header u-cf"> <div class="Tweet-brand u-floatRight"> <span class="u-hiddenInNarrowEnv"> <a class="FollowButton follow-button profile" data-scribe="component:followbutton" href="https://twitter.com/neiltyson" role="button" title="Follow Neil deGrasse Tyson on Twitter"><span class="FollowButton-bird"><div class="Icon Icon--twitter " aria-label="" title="" role="presentation"></div></span> Follow</a> </span> <span class="u-hiddenInWideEnv"><a href="https://twitter.com/download" data-scribe="element:logo"><div class="Icon Icon--twitter " aria-label="Get Twitter app" title="Get Twitter app" role="img"></div></a></span> </div> <div class="TweetAuthor " data-scribe="component:author"> <a class="TweetAuthor-link Identity u-linkBlend" data-scribe="element:user_link" href="https://twitter.com/neiltyson" aria-label="Neil deGrasse Tyson (screen name: neiltyson)"> <span class="TweetAuthor-avatar Identity-avatar"> <img class="Avatar" data-scribe="element:avatar" data-src-2x="https://pbs.twimg.com/profile_images/74188698/NeilTysonOriginsA-Crop_bigger.jpg" alt="" data-src-1x="https://pbs.twimg.com/profile_images/74188698/NeilTysonOriginsA-Crop_normal.jpg" src="https://pbs.twimg.com/profile_images/74188698/NeilTysonOriginsA-Crop_normal.jpg"> </span> <span class="TweetAuthor-name Identity-name customisable-highlight" title="Neil deGrasse Tyson" data-scribe="element:name">Neil deGrasse Tyson</span> <span class="TweetAuthor-verifiedBadge" data-scribe="element:verified_badge"><div class="Icon Icon--verified " aria-label="Verified Account" title="Verified Account" role="img"></div><b class="u-hiddenVisually">✔</b></span> <span class="TweetAuthor-screenName Identity-screenName" title="@neiltyson" data-scribe="element:screen_name" dir="ltr">@neiltyson</span> </a> </div> </div> <div class="Tweet-body e-entry-content" data-scribe="component:tweet"> <p class="Tweet-text e-entry-title" lang="en" dir="ltr"> \
</p> \
<ul class="Tweet-actions" data-scribe="component:actions" role="menu" aria-label="Tweet actions"> <li class="Tweet-action"> <a class="TweetAction TweetAction--reply web-intent" href="https://twitter.com/intent/tweet?in_reply_to=850554635467333633" data-scribe="element:reply"><div class="Icon Icon--reply TweetAction-icon" aria-label="Reply" title="Reply" role="img"></div></a></li> <li class="Tweet-action"> <a class="TweetAction TweetAction--retweet web-intent" href="https://twitter.com/intent/retweet?tweet_id=850554635467333633" data-scribe="element:retweet"><div class="Icon Icon--retweet TweetAction-icon" aria-label="Retweet" title="Retweet" role="img"></div> <span class="TweetAction-stat" data-scribe="element:retweet_count" aria-hidden="true">136</span> <span class="u-hiddenVisually">136 Retweets</span> </a></li> <li class="Tweet-action"> <a class="TweetAction TweetAction--heart web-intent" href="https://twitter.com/intent/like?tweet_id=850554635467333633" data-scribe="element:heart"><div class="Icon Icon--heart TweetAction-icon" aria-label="Like" title="Like" role="img"></div> <span class="TweetAction-stat" data-scribe="element:heart_count" aria-hidden="true">704</span> <span class="u-hiddenVisually">704 likes</span> </a></li> </ul> </div> </blockquote> </div> </div><div class="resize-sensor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; z-index: -1; visibility: hidden;"><div class="resize-sensor-expand" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;"><div style="position: absolute; left: 0px; top: 0px; transition: 0s; width: 510px; height: 355px;"></div></div><div class="resize-sensor-shrink" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;"><div style="position: absolute; left: 0; top: 0; transition: 0s; width: 200%; height: 200%"></div></div></div></div> \
<style type="text/css">@import url("https://platform.twitter.com/css/tweet.3a5bba37d8a97ff1a6185653efe28c38.light.ltr.css");</style>';
				
				$(".Tweet-text", shadow).append(content);
				return shadow;;
			},
			
            layout: function(f) {
                $(window).load(f).resize(f);
            },
            
            getViewportWidth: function() {
                if (typeof window.innerWidth != "undefined") {
                    return window.innerWidth;
                }
                return $(window).width();
            },
            
            getViewportHeight: function() {
                if (typeof window.innerHeight != "undefined") {
                    return window.innerHeight;
                }
                return $(window).height();
            },
            
            isScrolledIntoView: function(elem) {
                var docViewTop = $(window).scrollTop();
                var docViewBottom = docViewTop + self.getViewportHeight();
                var elemTop = $(elem).offset().top;
                var elemBottom = elemTop + $(elem).height();
                return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
            },
            
            whenScrolledIntoView: function(selector, f) {
                var elems;
                
                $(function() {
                    elems = selector();
                });
            
                var callback = function() {
                    elems.each(function() {
                        var oldScrolledIn = $(this).data("scrolledIn");
                        var scrolledIn = self.isScrolledIntoView(this);
                        if (scrolledIn && (typeof oldScrolledIn == "undefined" || !oldScrolledIn)) {
                            f();
                        }
                        if (scrolledIn != oldScrolledIn) {
                            $(this).data("scrolledIn", scrolledIn);
                        }
                    });
                };
                
                $(window).load(callback).scroll(callback);
            },
            
            getFace: function(userId) {
                return $("img[src*='\/" + userId + "-user_icon']");
            },
    
            getNameplate: function(username) {
                return $("a[href='gforum.cgi?username=" + encodeURIComponent(username) + ";'] > big");
            },
            
            getPost: function(postID) {
                return $("a[href='gforum.cgi?post=" + postID + "#" + postID +"']").closest(".body_table_container");
            },

            celebrate: function(postID) {
                getPost(postID).remove();
            },

            ensureYoutubeApiLoaded: function() {
                var scripts = $("script");
                if (scripts.toArray().some(function(script) { return $(script).prop("src") === youtubeApiSrc; })) return;
                scripts.first().before($("<script/>", {type: "text/javascript", src: youtubeApiSrc}));
            },

            whenYoutubeApiReady: function(callback) {
                if (typeof YT != "undefined" && typeof YT.Player != "undefined") {
                    callback();
                    return;
                }
    
                var oldReady = window.onYouTubeIframeAPIReady;
                window.onYouTubeIframeAPIReady = function() {
                    if (typeof oldReady != "undefined") oldReady();
                    callback();
                }
                self.ensureYoutubeApiLoaded();
            },

            addYTPlayer: function(elementOrId, options, callback) {
                var finalOptions = $.extend(true, {}, defaultYTPlayerOptions);
                if (options != null) {
                    $.extend(true, finalOptions, options);
                }
    
                self.whenYoutubeApiReady(function() {
                    var player = new YT.Player(elementOrId, finalOptions);
                    if (options != null && options.loop) {
                        var handlers = {};
                        handlers[YT.PlayerState.ENDED] = function(event) {
                            event.target.playVideo();
                        };
                        self.addYTPlayerStateHandlers(player, handlers);
                    }
                    if (callback != null) callback(player);
                });
            },

            addYTPlayerStateHandlers: function(player, handlers) {
                $.each(handlers, function(state, handler) {
                    player.addEventListener("onStateChange", function(event) {
                         if (event.data == state) handler(event);
                    });
                });
            },
            
        };
        
        return self;
    })();
    
    var Taz_GHelpers = TazGHelpers;
}

var Zalgo = {
    chars: {
        0 : [ /* up */
    '\u030d', /*     ̍     */
    '\u030e', /*     ̎     */
    '\u0304', /*     ̄     */
    '\u0305', /*     ̅     */
    '\u033f', /*     ̿     */
    '\u0311', /*     ̑     */
    '\u0306', /*     ̆     */
    '\u0310', /*     ̐     */
    '\u0352', /*     ͒     */
    '\u0357', /*     ͗     */
    '\u0351', /*     ͑     */
    '\u0307', /*     ̇     */
    '\u0308', /*     ̈     */
    '\u030a', /*     ̊     */
    '\u0342', /*     ͂     */
    '\u0343', /*     ̓     */
    '\u0344', /*     ̈́     */
    '\u034a', /*     ͊     */
    '\u034b', /*     ͋     */
    '\u034c', /*     ͌     */
    '\u0303', /*     ̃     */
    '\u0302', /*     ̂     */
    '\u030c', /*     ̌     */
    '\u0350', /*     ͐     */
    '\u0300', /*     ̀     */
    '\u0301', /*     ́     */
    '\u030b', /*     ̋     */
    '\u030f', /*     ̏     */
    '\u0312', /*     ̒     */
    '\u0313', /*     ̓     */
    '\u0314', /*     ̔     */
    '\u033d', /*     ̽     */
    '\u0309', /*     ̉     */
    '\u0363', /*     ͣ     */
    '\u0364', /*     ͤ     */
    '\u0365', /*     ͥ     */
    '\u0366', /*     ͦ     */
    '\u0367', /*     ͧ     */
    '\u0368', /*     ͨ     */
    '\u0369', /*     ͩ     */
    '\u036a', /*     ͪ     */
    '\u036b', /*     ͫ     */
    '\u036c', /*     ͬ     */
    '\u036d', /*     ͭ     */
    '\u036e', /*     ͮ     */
    '\u036f', /*     ͯ     */
    '\u033e', /*     ̾     */
    '\u035b', /*     ͛     */
    '\u0346', /*     ͆     */
    '\u031a'  /*     ̚     */
    ],
    1 : [ /* down */
    '\u0316', /*     ̖     */
    '\u0317', /*     ̗     */
    '\u0318', /*     ̘     */
    '\u0319', /*     ̙     */
    '\u031c', /*     ̜     */
    '\u031d', /*     ̝     */
    '\u031e', /*     ̞     */
    '\u031f', /*     ̟     */
    '\u0320', /*     ̠     */
    '\u0324', /*     ̤     */
    '\u0325', /*     ̥     */
    '\u0326', /*     ̦     */
    '\u0329', /*     ̩     */
    '\u032a', /*     ̪     */
    '\u032b', /*     ̫     */
    '\u032c', /*     ̬     */
    '\u032d', /*     ̭     */
    '\u032e', /*     ̮     */
    '\u032f', /*     ̯     */
    '\u0330', /*     ̰     */
    '\u0331', /*     ̱     */
    '\u0332', /*     ̲     */
    '\u0333', /*     ̳     */
    '\u0339', /*     ̹     */
    '\u033a', /*     ̺     */
    '\u033b', /*     ̻     */
    '\u033c', /*     ̼     */
    '\u0345', /*     ͅ     */
    '\u0347', /*     ͇     */
    '\u0348', /*     ͈     */
    '\u0349', /*     ͉     */
    '\u034d', /*     ͍     */
    '\u034e', /*     ͎     */
    '\u0353', /*     ͓     */
    '\u0354', /*     ͔     */
    '\u0355', /*     ͕     */
    '\u0356', /*     ͖     */
    '\u0359', /*     ͙     */
    '\u035a', /*     ͚     */
    '\u0323'  /*     ̣     */
        ],
    2 : [ /* mid */
    '\u0315', /*     ̕     */
    '\u031b', /*     ̛     */
    '\u0340', /*     ̀     */
    '\u0341', /*     ́     */
    '\u0358', /*     ͘     */
    '\u0321', /*     ̡     */
    '\u0322', /*     ̢     */
    '\u0327', /*     ̧     */
    '\u0328', /*     ̨     */
    '\u0334', /*     ̴     */
    '\u0335', /*     ̵     */
    '\u0336', /*     ̶     */
    '\u034f', /*     ͏     */
    '\u035c', /*     ͜     */
    '\u035d', /*     ͝     */
    '\u035e', /*     ͞     */
    '\u035f', /*     ͟     */
    '\u0360', /*     ͠     */
    '\u0362', /*     ͢     */
    '\u0338', /*     ̸     */
    '\u0337', /*     ̷      */
    '\u0361', /*     ͡     */
    '\u0489' /*     ҉_     */
    ]

    },
    random: function(len) {
        if (len == 1) return 0;
        return !!len ? Math.floor(Math.random() * len + 1) - 1 : Math.random();
    },
    generate: function(str) {
        var str_arr = str.split(''),
            output = str_arr.map(function(a) {
                if(a == " ") return a;
                for(var i = 0, l = Zalgo.random(16);
                    i<l;i++){
                        var rand = Zalgo.random(3);
                    a += Zalgo.chars[rand][
                        Zalgo.random(Zalgo.chars[rand].length)
                        ];
                 }
                return a;
            });
        return output.join('');
    }
};

if (typeof JeffHelpers == "undefined") {
    var JeffHelpers = (function() {
        var self = {
            faceBands: {},
            registerFaceSong: function(userId, songPath) {
                if (typeof self.faceBands[userId] != "undefined") return;
        
                var isPlaying = false; 
                var continuousPlay = false;
                var selectedFace = TazGHelpers.getFace(userId);
                
                var audio = $("<audio/>").attr("src", songPath).get(0);
                self.faceBands[userId] = true;
                
                selectedFace.after(audio).click(function() {
                    if (!isPlaying) {
                        audio.play();
                        isPlaying = true;
                    };
                    continuousPlay = !continuousPlay;
                })
                .mouseenter(function() {
                    if (isPlaying) return;
                    audio.play();
                    isPlaying = true;
                })
                .mouseout(function() {
                    if (continuousPlay || !isPlaying) return;
                    audio.pause();
                    isPlaying = false;
                });
            }
        };
        
        return self;
    })();
};