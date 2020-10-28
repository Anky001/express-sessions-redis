import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";

export function useSessionMiddleware() {
  /**
   * When Redis is used as a Store, load it into Express Connect
   */
  let store = undefined;
  if (process.env.EXPRESS_SESSION_DRIVER === "Redis") {
    const redisClient = redis.createClient();
    const redisStore = connectRedis(session);

    redisClient.on("error", (err) => {
      console.error("Redis error: ", err);
    });

    redisClient.on("ready", () => {
      console.info("Redis ready");
    });

    store = new redisStore({
      client: redisClient,
      host: process.env.EXPRESS_SESSION_DRIVER_REDIS_HOST,
      port: parseInt(process.env.EXPRESS_SESSION_DRIVER_REDIS_PORT, 10),
      ttl: parseInt(process.env.EXPRESS_SESSION_DRIVER_REDIS_TTL, 10),
    });
  } else {
    console.log("Using MemoryStore as Express session store");
  }

  return session({
    store,
    name: "_redisDemo",
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { path: "/", httpOnly: true, maxAge: 10000, secure: false },
    rolling: true,
  });
}
