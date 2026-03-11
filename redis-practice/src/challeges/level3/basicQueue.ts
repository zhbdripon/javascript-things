import { Redis } from "ioredis";

export type Job = {
  id: number;
};

export class JobQueue {
  private redisClient;
  private queueName = "job";

  constructor() {
    this.redisClient = new Redis("redis://localhost:6379");
  }

  async push(job: Job) {
    await this.redisClient.rpush(this.queueName, JSON.stringify(job));
  }

  async getJob(): Promise<Job | null> {
    const result = await this.redisClient.blpop(this.queueName, 0);

    if (!result) return null;

    return JSON.parse(result[1]);
  }
}

export class Worker {
  private running = true;

  constructor(
    private queue: JobQueue,
    private processFunc: (job: Job) => Promise<void>
  ) {}

  async start() {
    while (this.running) {
      const job = await this.queue.getJob();

      if (!job) continue;

      try {
        await this.processFunc(job);
      } catch (err) {
        console.error("Job failed:", err);
      }
    }
  }

  stop() {
    this.running = false;
  }
}