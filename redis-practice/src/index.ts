import { getUser } from "./challeges/level1/simpleCacheLayer.js";
import { publish } from "./challeges/level1/simplePubSub.js";
import { rateLimitEvent } from "./challeges/level2/rateLimiter.js"
import { JobQueue, Worker, type Job } from "./challeges/level3/basicQueue.js";


const queue = new JobQueue()

queue.push({
    id: 1
})

queue.push({
    id: 2
})

queue.push({
    id: 3
})

const worker = new Worker(queue, async (job: Job) => {
    console.log(`processing Job with id ${job.id}`)
})

worker.start();

