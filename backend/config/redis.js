const redis = require('redis');

// Create a Redis client
const redisClient = redis.createClient({
  url: 'redis://127.0.0.1:6379' // Default Redis URL
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

// Connect to Redis immediately
(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;