
// A generator is function that can pause its execution. we can use
// for..of loop to get values

function* generateNumber() { // 1 2 3
    yield 1;
    yield 2;
    yield 3;
}


// here generateNumber() return a generator object
// and on each step of the loop it calls the next() function
for (let num of generateNumber()) {
    console.log(num)
}

const generator = generateNumber();

console.log(generator.next()) // {value: 1, done: false}
console.log(generator.next()) // {value: 2, done: false}
console.log(generator.next()) // {value: 3, done: false}
console.log(generator.next()) // {value: undefined, done: true}



// ASYNC GENERATOR
// async generator combines the behavior of an async func
// and generator behavior. assume we want to read a large without loading
// the entire content to memory

// example 1
const stream = fs.createReadStream("large-file.txt");

for await (const chunk of stream) {
  console.log(chunk);
}

// example 2
// we can consume the function and read users without loading all user
// to consumer memory. assume the function live somewhere else
async function* fetchUsers() {
  const response = await fetch("/api/users");
  const users = await response.json();

  for (const user of users) {
    yield user;
  }
}

for await (const user of fetchUsers()) {
  console.log(user);
}

// example 3
// streaming llm output
// assume its a sdk function of an llm library eg: openai
async function* streamResponse() {
  const stream = await getLLMStream();

  for await (const chunk of stream) {
    yield chunk;
  }
}

// as a consumer we are getting chunk by chunk response instead of waiting 
// for the entire response
for await (const chunk of streamResponse()) {
  process.stdout.write(chunk);
}

