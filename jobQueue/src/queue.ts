export type JobOptions = {
  delay: number;
  priority: number;
  retry: {
    totalAttempts: number;
    maxAttempts: number;
    delay: number;
  };
};

export type Job<T> = {
  id: string;
  name: string;
  data: T;
  options: JobOptions;
};

export type QueueOptions = {
  retryAttempts: number;
  retryDelay: number;
};

export type OptionalJobOptions = Partial<JobOptions> & {
  retry?: Partial<JobOptions["retry"]>;
};

export abstract class Queue<T> {
  constructor(
    protected queueName: string,
    protected options: QueueOptions = { retryAttempts: 10, retryDelay: 1000 },
  ) {}

  async addJob(
    job: Omit<Job<T>, "id" | "options"> & {
      options?: OptionalJobOptions;
      id?: string;
    },
  ) {
    const id = job.id ?? crypto.randomUUID();
    if (
      (job.options?.retry?.totalAttempts ?? 0) >=
      (job.options?.retry?.maxAttempts ?? 1)
    ) {
      return id;
    }

    await this.push({
      ...job,
      id,
      options: {
        delay: job.options?.delay ?? 0,
        priority: job.options?.priority ?? 0,
        retry: {
          totalAttempts: job.options?.retry?.totalAttempts ?? 0,
          maxAttempts:
            job.options?.retry?.maxAttempts ?? this.options.retryAttempts,
          delay: job.options?.retry?.delay ?? this.options.retryDelay,
        },
      },
    });

    return id;
  }

  protected abstract push(job: Job<T>): Promise<any>;

  abstract getOrWaitForJob(): Promise<Job<T> | null>;

  abstract get length(): Promise<number>;
}
