async function limit(tasks, concurrency) {
  if (concurrency < 1) throw new Error("Concurrency must be at least 1");

  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    const promise = task().then(
      (result) => {
        console.log(result);
        executing.delete(promise);
        return result;
      },
      (error) => {
        executing.delete(promise);
        throw error;
      },
    );

    executing.add(promise);
    results.push(promise);
    console.log("Running promise count : ", executing.size);

    if (executing.size >= concurrency) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

const delay = (ms) => () =>
  new Promise((resolve) => setTimeout(() => resolve(`done in ${ms}ms`), ms));

const fns = [delay(1000), delay(500), delay(1500), delay(300), delay(800)];

limit(fns, 2);
console.log("Hello")
