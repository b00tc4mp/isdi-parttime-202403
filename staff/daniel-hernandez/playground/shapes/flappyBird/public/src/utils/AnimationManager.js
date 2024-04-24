var AnimationManager = function () {
    var animationId = null;

    return {
        start: function (callback) {
            animationId = requestAnimationFrame(callback);
        },
        stop: function () {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        }
    }
}