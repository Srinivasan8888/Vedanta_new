import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const client = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

console.log('Attempting to connect to Redis...')

client.on('connect', () => {
  console.log('Client connected to Redis...')
})

client.on('ready', () => {
  console.log('Client connected to Redis and ready to use...')
})

client.on('error', (err) => {
  console.error('Error connecting to Redis:', err.message)
})

client.on('end', () => {
  console.log('Client disconnected from Redis')
})

process.on('SIGINT', () => {
  client.quit()
})

client.on('error', (err) => {
  console.log('Redis Client Error', err);
});

client.connect().catch(err => {
  console.error('Failed to connect to Redis:', err.message);
});

export { client };