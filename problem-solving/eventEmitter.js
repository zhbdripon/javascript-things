// https://www.greatfrontend.com/questions/javascript/event-emitter
export default class EventEmitter {
    constructor() {
      this.eventHandlerMap = {};
    }
  
    /**
     * @param {string} eventName
     * @param {Function} listener
     * @returns {EventEmitter}
     */
    on(eventName, listener) {
      if (!this.eventHandlerMap[eventName]) {
        this.eventHandlerMap[eventName] = [listener];
      } else {
        this.eventHandlerMap[eventName].push(listener);
      }
  
      return this;
    }
  
    /**
     * @param {string} eventName
     * @param {Function} listener
     * @returns {EventEmitter}
     */
    off(eventName, listener) {
      if (this.eventHandlerMap[eventName]) {
        let numberOfRemoval = 0;
        this.eventHandlerMap[eventName] = this.eventHandlerMap[eventName].filter(
          (item) => {
            if (item === listener && numberOfRemoval === 0) {
              numberOfRemoval++;
              return false;
            }
  
            return true;
          },
        );
  
        if (this.eventHandlerMap[eventName].length < 1) {
          this.eventHandlerMap[eventName] = undefined;
        }
      }
  
      return this;
    }
  
    /**
     * @param {string} eventName
     * @param  {...any} args
     * @returns {boolean}
     */
    emit(eventName, ...args) {
      if (
        !this.eventHandlerMap[eventName] ||
        !this.eventHandlerMap.hasOwnProperty(eventName)
      ) {
        return false;
      }
  
      for (let _listener of this.eventHandlerMap[eventName]) {
        _listener(...args);
      }
  
      return true;
    }
  }
  