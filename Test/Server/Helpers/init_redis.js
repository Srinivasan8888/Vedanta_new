import redis from 'redis';

const client = redis.createClient({
  host: '127.0.0.1', 
  port: 6379
});

console.log('Attempting to connect to Redis...')

client.on('connect', () => {
  console.log('Client connected to redis...')
})

client.on('ready', () => {
  console.log('Client connected to redis and ready to use...')
})

client.on('error', (err) => {
  console.error('Error connecting to redis:', err.message)
})

client.on('end', () => {
  console.log('Client disconnected from redis')
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

export default client;