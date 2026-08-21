import EventEmitter from "node:events";

function DOMEvents() {
    const myEmitter = new EventEmitter();

    return {
        addEventListener(eventType, callback) {
            myEmitter.on(eventType, callback);
        },

        removeEventListener(eventType, callback) {
            myEmitter.off(eventType, callback);
        },

        dispatchEvent(eventType, detail) {
            const event = {
                type: eventType,
                target: this,
                currentTarget: this,
                detail: detail
            };

            myEmitter.emit(eventType, event);
        }
    };
}

export default DOMEvents;