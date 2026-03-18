function flatten(arr) {
  return arr.reduce((acc, cur) => {
    if (Array.isArray(cur)) {
      return acc.concat(flatten(cur));
    } else {
      return acc.concat(cur);
    }
  }, []);
}

/*
// Alternate solution

function flatten(arr) {
    let returnedArr = [];
    arr.forEach(item => {
        if(Array.isArray(item)) {
            returnedArr = [...returnedArr, ...flatten(item)];
        }else {
            returnedArr = [...returnedArr, item];
        }
    })

    return returnedArr;
}
*/
let arr = flatten([1, [2, [3, [4]], 5]]);

console.log(arr);
