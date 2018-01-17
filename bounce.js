(function() {
    var getOffsetInfo = function(elem) {
        var offset = $(elem).offset();
        var result = {
            left: offset.left,
            top: offset.top,
            width: $(elem).outerWidth(false),
            height: $(elem).outerHeight(false)
        };
        $.extend(result, {
            right: result.left + result.width,
            bottom: result.top + result.height
        });
        return result;
    };
    
    var addOffsetInfo = function(offsetInfo, velocity) {
        return {
            left: offsetInfo.left + velocity.x,
            top: offsetInfo.top + velocity.y,
            right: offsetInfo.right + velocity.x,
            bottom: offsetInfo.bottom + velocity.y,
            width: offsetInfo.width,
            height: offsetInfo.height
        };
    };
    
    var fps = 30;
    
    var minimumSpeed = 1;
    var maximumSpeed = 5;
    var maximumSpeedDeviation = 3;
    
    var speedScale = 100;

    var angularDecay = .025;
    var angularSpeedScale = 50;
    
    var getInitialVelocityComponent = function() {
        var speed = (Math.random() * (maximumSpeed - minimumSpeed) + minimumSpeed) * speedScale / fps;
        return Math.random() < .5 ? -speed : speed;
    }
    
    var getNextVelocityComponent = function(baseComponent) {
        var baseSpeed = Math.abs(baseComponent) / (speedScale / fps);
        var deviation = Math.random() * maximumSpeedDeviation * 2 - maximumSpeedDeviation;
        var speed = baseSpeed + deviation;
        if (speed < minimumSpeed) {
            speed = minimumSpeed;
        } else if (speed > maximumSpeed) {
            speed = maximumSpeed;
        }
        speed *= speedScale / fps;
        return baseComponent < 0 ? -speed : speed;
    };
    
    var getNextAngularVelocity = function() {
        var speed = (Math.random() * (maximumSpeed - minimumSpeed) + minimumSpeed) * angularSpeedScale / fps;
        return Math.random() < .5 ? -speed : speed;
    }

    TazGHelpers.bounce = function(faces, rotate) {
        faces.eq(Math.floor(Math.random() * faces.length)).data({
            velocity: {x: getInitialVelocityComponent(), y: getInitialVelocityComponent(), angular: 0},
            degrees: 0
        });
        
        faces.each(function() {
            var thisDisplay = $(this).css("display");
            var display = thisDisplay == "inline" ? "inline-block" : thisDisplay;
            var thisOffset = $(this).offset();
            $("<div/>").insertBefore(this)
                .width($(this).outerWidth(true))
                .height($(this).outerHeight(true))
                .css({
                    display: display,
                    //position: "relative"
                });
            $("body").append(
                $(this).detach()
                .css({
                    position: "absolute",
                    zIndex: 1
                })
                .offset(thisOffset));
        });
        
        var initialDocumentWidth = $(document).outerWidth();
        var initialDocumentHeight = $(document).outerHeight();
        
        setInterval(function() {
            faces.each(function() {
                var velocity = $(this).data("velocity");
                if (typeof velocity == "undefined") return;
                
                var thisOffsetInfo = getOffsetInfo(this);
                var nextOffsetInfo = addOffsetInfo(thisOffsetInfo, velocity);
                
                if (nextOffsetInfo.left <= 0 || nextOffsetInfo.right >= initialDocumentWidth) {
                    velocity.x = -velocity.x;
                    velocity.angular = getNextAngularVelocity();
                }
                if (nextOffsetInfo.top <= 0 || nextOffsetInfo.bottom >= initialDocumentHeight) {
                    velocity.y = -velocity.y;
                    velocity.angular = getNextAngularVelocity();
                }
                nextOffsetInfo = addOffsetInfo(thisOffsetInfo, velocity);
                
                faces.not(this).each(function() {
                    var otherOffsetInfo = getOffsetInfo(this);

                    var isCurrentlyOutside =
                        thisOffsetInfo.right < otherOffsetInfo.left || thisOffsetInfo.left > otherOffsetInfo.right
                        || thisOffsetInfo.bottom < otherOffsetInfo.top || thisOffsetInfo.top > otherOffsetInfo.bottom;
                        
                    var isGoingInside =
                        isCurrentlyOutside
                        && ((((nextOffsetInfo.left <= otherOffsetInfo.left && nextOffsetInfo.right >= otherOffsetInfo.left)
                              || (nextOffsetInfo.right >= otherOffsetInfo.right && nextOffsetInfo.left <= otherOffsetInfo.right))
                             && ((nextOffsetInfo.top <= otherOffsetInfo.top && nextOffsetInfo.bottom >= otherOffsetInfo.top)
                                 || (nextOffsetInfo.bottom >= otherOffsetInfo.bottom && nextOffsetInfo.top <= otherOffsetInfo.bottom)))
                            || (((nextOffsetInfo.left >= otherOffsetInfo.left && nextOffsetInfo.left <= otherOffsetInfo.right)
                                 || (nextOffsetInfo.right <= otherOffsetInfo.right && nextOffsetInfo.right >= otherOffsetInfo.left))
                                && ((nextOffsetInfo.top >= otherOffsetInfo.top && nextOffsetInfo.top <= otherOffsetInfo.bottom)
                                    || (nextOffsetInfo.bottom <= otherOffsetInfo.bottom && nextOffsetInfo.bottom >= otherOffsetInfo.top))));
                    
                    if (!isGoingInside) return;
                    
                    $(this).data("velocity", {
                        x: getNextVelocityComponent(velocity.x),
                        y: getNextVelocityComponent(velocity.y),
                        angular: getNextAngularVelocity()
                    });
                    
                    var overlapX = velocity.x < 0 ? otherOffsetInfo.right - nextOffsetInfo.right : nextOffsetInfo.left - otherOffsetInfo.left;
                    var overlapY = velocity.y < 0 ? otherOffsetInfo.bottom - nextOffsetInfo.bottom : nextOffsetInfo.top - otherOffsetInfo.top;
                        
                    if (overlapX > overlapY) {
                        velocity.y = getNextVelocityComponent(-velocity.y);
                    } else {
                        velocity.x = getNextVelocityComponent(-velocity.x);
                    }
                });
                
                if (rotate && velocity.angular) {
                    var degrees = $(this).data("degrees") || 0;
                    degrees = (degrees + velocity.angular) % 360;
                    if (degrees < 0) degrees += 360;
                    $(this).data("degrees", degrees);
                    $(this).rotate(degrees);
                    
                    var angularMagnitude = Math.abs(velocity.angular);
                    angularMagnitude -= angularDecay * angularSpeedScale / fps;
                    if (angularMagnitude < 0) angularMagnitude = 0;
                    velocity.angular = velocity.angular < 0 ? -angularMagnitude : angularMagnitude;
                }
                
                $(this).css({
                    left: "+=" + velocity.x,
                    top: "+=" + velocity.y,
                });
            });
        }, 1000 / fps);
    };
})();