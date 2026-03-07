import { Redis as IORedis } from "ioredis";
import { Queue, type QueueOptions, type Job } from "./queue.js";

export class RedisQueue<T> extends Queue<T> {
  private redisBlocking: IORedis;
  private redisNonBlocking: IORedis;
  private redisSubscriber: IORedis;

  constructor(redisUrl: string, queueName: string, options?: QueueOptions) {
    super(queueName, options);
    this.redisBlocking = new IORedis(redisUrl);
    this.redisNonBlocking = new IORedis(redisUrl);
    this.redisSubscriber = new IORedis(redisUrl);

    this.listenForExpiredJobs();
    this.checkForExpiredJobs();
  }

  private async listenForExpiredJobs() {
    await this.redisSubscriber.subscribe("__keyevent@0__:expired");

    this.redisSubscriber.on("message", async (channel, message) => {
      if (channel !== "__keyevent@0__:expired") return;
      if (!message.startsWith(this.expiringJobIdListQueue(""))) return;

      const jobId = message.split(":").pop();
      if (jobId == null) return;

      await this.moveJobToActive(jobId);
    });
  }

  private async checkForExpiredJobs() {
    const expiredJobs = await this.redisNonBlocking.zrangebyscore(
      this.scheduledJobIdsQueue,
      0,
      Date.now(),
    );

    for (const jobId of expiredJobs) {
      await this.moveJobToActive(jobId);
    }
  }

  private async moveJobToActive(jobId: string) {
    const job = await this.redisNonBlocking.hget(this.scheduledJobsList, jobId);
    if (job == null) return;

    await this.addActiveJob(JSON.parse(job));
    await this.redisNonBlocking
      .multi()
      .zrem(this.scheduledJobIdsQueue, jobId)
      .hdel(this.scheduledJobsList, jobId)
      .exec();
  }

  protected async push(job: Job<T>) {
    const expiringJobIdListQueue = this.expiringJobIdListQueue(job.id);
    if (job.options.delay > 0) {
      return await this.redisNonBlocking
        .multi()
        .set(expiringJobIdListQueue, job.id)
        .pexpire(expiringJobIdListQueue, job.options.delay)
        .zadd(this.scheduledJobIdsQueue, Date.now() + job.options.delay, job.id)
        .hset(this.scheduledJobsList, job.id, JSON.stringify(job))
        .exec();
    } else {
      return await this.addActiveJob(job);
    }
  }

  private async addActiveJob(job: Job<T>) {
    return await this.redisNonBlocking.zadd(
      this.activeJobsQueue,
      (job.options.priority ?? 0) * -1,
      JSON.stringify(job),
    );
  }

  async getOrWaitForJob() {
    const data = await this.redisBlocking.bzpopmin(this.activeJobsQueue, 0);
    return data?.[1] ? JSON.parse(data[1]) : null;
  }

  get length() {
    return this.redisNonBlocking.zcard(this.activeJobsQueue);
  }

  private expiringJobIdListQueue(jobId: string) {
    return `${this.queueName}:expiringJobs:${jobId}`;
  }

  private get activeJobsQueue() {
    return `${this.queueName}:active`;
  }

  private get scheduledJobIdsQueue() {
    return `${this.queueName}:delayed`;
  }

  private get scheduledJobsList() {
    return `${this.queueName}:jobs`;
  }
}
