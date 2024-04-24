var ListenerManager = function() {
    var listeners = [];

    return {
        add: function (element, eventType, callback, useCapture) {
            element.addEventListener(eventType, callback, useCapture);
            listeners.push({element: element, eventType: eventType, callback: callback, useCapture: useCapture});
        },
        remove: function(element, eventType, callback, useCapture) {
            element.removeEventListener(eventType, callback, useCapture);
            listeners = listeners.filter(function (listener) {
                return !(listener.element === element && listener.eventType === eventType && listener.callback === callback && listener.useCapture === useCapture)
            });
        },
        removeAll: function(){
            listeners.forEach(function(listener){
                listener.element.removeEventListener(listener.eventType, listener.callback, listener.useCapture);
            });
        }
    }
}