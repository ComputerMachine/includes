$(function() {
    /* [spoiler]FREE GAMES[/spoiler] */
    $(".spoiler-trigger").click(function() {
        var $this = $(this);
        $this.closest(".spoiler")
            .children(".spoiler-body")
            .slideToggle({
                always: function(animation) {
                    $this.text(
                        $(animation.elem).is(":hidden") ? "(Click to view)" : "(Click to hide)"
                    );
                }
            });
    });
});