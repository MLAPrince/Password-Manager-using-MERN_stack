import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import dotenv from "dotenv";

dotenv.config();

const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    // Allow up to 100 requests per IP per minute using sliding window algorithm
    limiter: Ratelimit.slidingWindow(100, "1 m")
});

export default rateLimit;