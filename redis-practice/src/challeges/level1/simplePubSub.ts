import { Redis } from 'ioredis';

const publisherClient = new Redis("redis://localhost:6379");
const subscriberClient = new Redis("redis://localhost:6379");


await subscriberClient.subscribe("my-channel")
subscriberClient.on("message", (channel, message) => {
    console.log(channel, message)
})

publisherClient.on("error", (err) => {
  console.error("Redis publisher error:", err);
});


export async function publish() {
    await publisherClient.publish('my-channel', "Hello world")
}


