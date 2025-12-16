// add(1)(2)(3)(4)(); // returns 10
// Task: Implement add function to achieve this.

const add = (num) => {
  if (num === undefined) return 0;
  let sum = num;
  
  const innerFunc =  (arg) => {
    if (arg === undefined) {
      return sum;
    }
    
    sum+=arg;
    
    return innerFunc;
  }
    
  return innerFunc;
}

console.log(add(1)(2)(3)())