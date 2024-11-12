/*
_.isEqual is useful when you want to compare complex data types by value not the reference.

Can you implement your own version of deep equal isEqual? The lodash version covers a lot of data types. In this problem, you are asked to support :

1. primitives
2. plain objects (object literals)
3. array
Objects are compared by their own, not inherited, enumerable properties
*/

/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function isEqual(a, b) {
  
    const isPrimitive = (value) => {
      if (value === null) return true;
      
      const type = typeof(value);
      const types = ['number', 'string', 'boolean', 'symbol', 'undefined', 'bigint']
      return types.includes(type)
    }
  
    if (a === null && b !== null)   return false;
    if (isPrimitive(a) && isPrimitive(b))   return a === b;
    if (isPrimitive(a) !== isPrimitive(b))  return false;
    if (Array.isArray(a) && !Array.isArray(b))  return false;
    
    // handing array
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
  
      for (let i = 0; i < a.length; i++) {
        if (a[i] === a && b[i] === b) { // circular array
          continue;
        }
        if (!isEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
  
    // handing objects
    const aKeys = Object.keys(a).sort()
    const bKeys = Object.keys(b).sort()
  
    if (!isEqual(aKeys, bKeys)) {
      return false;
    }
  
    for (key of aKeys) {
      if (a[key] === a && b[key] === b) { // circular object
        continue;
      }
  
      if (!isEqual(a[key], b[key])) {
        return false;
      }
    }
  
    return true;  
  }
  

  // testing
  // true
  console.log(isEqual(1,1))
  console.log(isEqual(undefined, ))
  console.log(isEqual([1,2],[1,2]))
  console.log(isEqual({a: '1', b:'2', c: { d: [1, 2]}},{b:'2', a: '1', c: {d: [1, 2]}}))
  const a = {}
  a.self = a
  const b = {self: a}
  console.log(isEqual(a, b))
  console.log("---------------")

  // false
  console.log(isEqual(1,2))
  console.log(isEqual(undefined, null))
  console.log(isEqual([1,2],[2, 1]))
  console.log(isEqual({a: '1', b:'2'},{b:'2', a: '1', c: '3'}))
  console.log(isEqual({a: '1', b:'2', c: { d: [1, 2]}},{b:'2', a: '1', c: {d: [2, 1]}}))




  