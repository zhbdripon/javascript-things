import { Redis } from "ioredis";

const redisSubsClient = new Redis("redis://localhost:6379");
const redisClient = new Redis("redis://localhost:6379");

export async function rateLimitEvent() {
  await redisSubsClient.subscribe("my-event");

  redisSubsClient.on("message", (channel, message) => {
    const userId = +message;
    rateLimitedFunc(userId);
  });
}

async function rateLimitedFunc(userId: number) {
  const key = `user-${userId}`;
  const requestCount = await redisClient.incr(`user-${userId}`);

  if (requestCount === 1) {
    await redisClient.expire(key, 30);
  }

  if (requestCount > 5) {
    console.log("You have reached request limit. Please try later");
    return;
  }

  console.log(`Hi User ${userId}. Your request has been processed!`);
}
