import { Redis } from "ioredis";

const redisClient = new Redis("redis://localhost:6379");

type User = {
  id: number;
  name: string;
  age: number;
};

const users = [
  {
    id: 2,
    name: "Ziaul Hoque",
    age: 21,
  },
] satisfies User[];

export async function getUser(userId: number) {
  const key = `user:${userId}`;
  const cachedUser = await redisClient.get(key);

  if (cachedUser) {
    console.log("from cache");
    return JSON.parse(cachedUser) as User;
  }

  const data = await getUserFromDatabase(userId);

  if (data && data.id) {
    console.log("From database");
    await redisClient.set(key, JSON.stringify(data), "EX", 10);
    await redisClient.expire(key, 10);
    return data;
  }

  return null;
}

async function getUserFromDatabase(userId: number): Promise<User | null> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 3000);
  });

  const user = users.find((singleUser) => singleUser.id === userId);

  return user ?? null;
}
