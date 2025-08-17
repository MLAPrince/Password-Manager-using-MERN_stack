// Import the Upstash Ratelimit library and configuration
import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // Get IP address from request
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || // Trust proxies
      req.socket?.remoteAddress ||                             // Fallback for Node
      req.ip;                                                  // Express IP

    if (!ip) {
      console.warn("Unable to determine IP address");
    }
    // Use IP as unique key for rate limit
    const { success, limit, remaining, reset } = await ratelimit.limit(ip);

    // Set rate limit headers so frontend or tools (like Postman) can read them
    res.setHeader("X-RateLimit-Limit", limit);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", reset);


    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limit error:", error);
    next(error);
  }
};

export default rateLimiter;
