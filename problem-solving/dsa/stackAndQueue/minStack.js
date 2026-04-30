// https://leetcode.com/problems/min-stack/

var MinStack = function () {
  this.items = [];
  this.min = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.items.push(val);

  if (this.min.length < 1) {
    this.min = [val];
  } else {
    this.min.push(Math.min(this.min.at(-1), val));
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.items.pop();
  this.min.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.items.at(-1);
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.min.at(-1);
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
