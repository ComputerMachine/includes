(function() {
    $(function() {
        $("body").css("backgroundColor", "black");
        $("#important_icon").toggle();
    });

    var animationsStarted = false;
    var startAnimations = function() {
        if (animationsStarted) return;

        glowBackground();

        setInterval(function() {
            $("#important_icon").toggle();
        }, 200);

        animationsStarted = true;
    };

    var glowBackground = function() {
        $("body")
            .animate(
                {backgroundColor: "red"})
            .animate(
                {backgroundColor: "black"},
                {
                    done: function() {
                        glowBackground();
                    }
                });
    };

    var widthAspectRatio = 4 / 3;
    var heightAspectRatio = 1 / widthAspectRatio;

    TazGHelpers.layout(function() {
        var player = $("#sports_player");

        var availableWidth = Math.max(TazGHelpers.getViewportWidth(), 200);
        var availableHeight = Math.max(TazGHelpers.getViewportHeight() - 200, 200);
        if (availableHeight > availableWidth) {
            player.width(availableWidth).height(availableWidth * heightAspectRatio)
        } else {            
            player.height(availableHeight).width(availableHeight * widthAspectRatio);
        }
    });

    var videoId = "UDptikEeAGY";
    var start = 44;
    var end = 91;

    window.onYouTubeIframeAPIReady = function() {
        var player = new YT.Player(
            "sports_player",
            {
                videoId: videoId,
                playerVars: {
                    showinfo: 0,
                    controls: 0,
                    rel: 0,
                    iv_load_policy: 3,
                    autoplay: 1,
                    start: start,
                    end: end,
                },
                events: {
                    onStateChange: onPlayerStateChange,
                }
            });
    };

    var onPlayerStateChange = function(event) {
        switch (event.data) {
            case YT.PlayerState.PLAYING:
                startAnimations();
                break;
            case YT.PlayerState.ENDED:
                event.target.playVideo();
                break;
        }
    };
})();