const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

function PromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!promises?.length) return resolve([]);
    let done = 0;
    let resArray = Array(promises.length);
    promises.forEach((item, ind) => {
      Promise.resolve(item)
        .then((res) => {
          resArray[ind] = res;
          done++;
          if (done === promises.length) resolve(resArray);
        })
        .catch(reject);
    });
  });
}

PromiseAll([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
