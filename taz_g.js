$(function() {
    if (window.hasTazGInitialized) return;
    window.hasTazGInitialized = true;
    
    var beamersFace = TazGHelpers.getFace(3);
    /*beamersFace.each(function() {
        $("<div/>").insertBefore(this)
            .width($(this).outerWidth(true))
            .height($(this).outerHeight(true))
            //.css("position", "relative")
            .append(
                $(this).detach()
                .css({
                    position: "absolute",
                    top: 0
                }));        
    });
    var initialZoomStep = -beamersFace.width() * .7;
    var zoomStep = initialZoomStep;    
    var zoomBeamer = function() {
        beamersFace.delay(3000).animate({
            width: "+=" + zoomStep,
            height: "+=" + zoomStep * beamersFace.width() / beamersFace.height()
        }, {
            duration: 1000,
            easing: "swing",
            done: function() {
                zoomStep = (zoomStep == initialZoomStep) ? 200 - beamersFace.width() : zoomStep * -1;
                zoomBeamer();
            }
        });
    };
    zoomBeamer();*/
    
    var jeffsFace = TazGHelpers.getFace(2);
    
    TazGHelpers.bounce(beamersFace/*.add(jeffsFace)*/, false);
    
    var lennysFace = TazGHelpers.getFace(4);
    setInterval(function() {
        lennysFace.css("visibility", function(i, current) {
            return current == "visible" ? "hidden" : "visible";
        });
    }, 100);

    var tazgsFace = TazGHelpers.getFace(12);
    var spinTazG = function() {
        $({degrees: 0}).animate(
            {degrees: 360},
            {
                duration: 2000,
                easing: "linear",
                step: function(now, fx) {
                    if (fx.prop == "degrees") {
                        tazgsFace.rotate(now);
                    }
                },
                done: function() {
                    spinTazG();
                }
            });
    };
    //spinTazG();
    
    var consultosName = "The Consultant";
    var consultosAliases = [
        "wat u say",
        "el consulto",
        "Kasaki",
        "jme",
        "Fart_King",
        "Blunt Master",
        "bong_lord69",
        "keef chief420",
        "bronson_buster",
        "hash hag",
        "social_justice_toker",
        "Hash Hunk Slam Dunk",
        "Bongholio",
        "Herbacious",
        "Toke Tamer",
        "Shroom Shahadah",
        "Kush Gulag",
    ];
    var nameLoop = [consultosName].concat(consultosAliases);
    var consultosNameplate = TazGHelpers.getNameplate(consultosName);
    var nameIndex = 0;
    var consult = function() {
        consultosNameplate.text(nameLoop[nameIndex]);
        nameIndex++;
        if (nameIndex == nameLoop.length) nameIndex = 0;
    };
    consult();
    setInterval(consult, 600);
});