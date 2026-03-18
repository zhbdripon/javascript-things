function groupBy(arr, groupBy) {

    let res = {}

    for (let obj of arr) {
        let key = obj[groupBy];
        
        if (!res.hasOwnProperty(key)) {
            res[key] = []
        }

        res[key].push(obj);
    }

    return res;
}


let group = groupBy(
  [
    {name: "John", age: 20},
    {name: "Jane", age: 20},
    {name: "Jack", age: 30}
  ],
  "age"
)

console.log(group);