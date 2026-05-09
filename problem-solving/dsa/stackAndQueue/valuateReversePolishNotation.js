// https://leetcode.com/problems/evaluate-reverse-polish-notation/
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  let stack = [];
  let a, b;
  for (let [ind, cur] of tokens.entries()) {
    switch (cur) {
      case "+":
        a = stack.pop();
        b = stack.pop();
        stack.push(a + b);
        break;
      case "-":
        a = stack.pop();
        b = stack.pop();
        stack.push(b - a);
        break;
      case "*":
        a = stack.pop();
        b = stack.pop();
        stack.push(a * b);
        break;
      case "/":
        a = stack.pop();
        b = stack.pop();
        stack.push(Math.trunc(b / a));
        break;
      default:
        stack.push(Number(cur));
        break;
    }
  }

  return stack.pop();
};
