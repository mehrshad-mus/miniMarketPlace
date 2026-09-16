import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"

const redis = Redis.fromEnv()

export const commentRateLimit = new Ratelimit({
    redis,

    limiter: Ratelimit.slidingWindow(5, "1 m"),

    analytics: true,
})