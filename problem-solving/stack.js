export default class Stack {
    constructor() {
      this.stack = [];
    }
  
    /**
     * Pushes an item onto the top of the stack.
     * @param {*} item The item to be pushed onto the stack.
     * @return {number} The new length of the stack.
     */
    push(item) {
      this.stack.push(item);
      return this.length();
    }
  
    /**
     * Remove an item at the top of the stack.
     * @return {*} The item at the top of the stack if it is not empty, `undefined` otherwise.
     */
    pop() {
      const deletedValue = this.peek();
      this.stack = this.stack.slice(0, this.length() - 1);
      return deletedValue;
    }
  
    /**
     * Determines if the stack is empty.
     * @return {boolean} `true` if the stack has no items, `false` otherwise.
     */
    isEmpty() {
      return this.length() === 0;
    }
  
    /**
     * Returns the item at the top of the stack without removing it from the stack.
     * @return {*} The item at the top of the stack if it is not empty, `undefined` otherwise.
     */
    peek() {
      return this.length() > 0 ? this.stack[this.length() - 1] : undefined;
    }
  
    /**
     * Returns the number of items in the stack.
     * @return {number} The number of items in the stack.
     */
    length() {
      return this.stack.length;
    }
  }
  