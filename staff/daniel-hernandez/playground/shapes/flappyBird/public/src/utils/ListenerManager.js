const ListenerManager = () => {
  let listeners = [];

  return {
    add: (element, eventType, callback, useCapture) => {
      element.addEventListener(eventType, callback, useCapture);
      listeners.push({
        element: element,
        eventType: eventType,
        callback: callback,
        useCapture: useCapture,
      });
    },
    remove: (element, eventType, callback, useCapture) => {
      element.removeEventListener(eventType, callback, useCapture);
      listeners = listeners.filter((listener) => {
        return !(
          listener.element === element &&
          listener.eventType === eventType &&
          listener.callback === callback &&
          listener.useCapture === useCapture
        );
      });
    },
    removeAll: () => {
      listeners.forEach((listener) => {
        listener.element.removeEventListener(
          listener.eventType,
          listener.callback,
          listener.useCapture,
        );
      });
    },
  };
};
