const AnimationManager = () => {
  let animationId = null;

  return {
    start: (callback) => {
      animationId = requestAnimationFrame(callback);
    },
    stop: () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    },
  };
};
