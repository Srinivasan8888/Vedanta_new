import { io } from 'socket.io-client';

const asideSocket = io(`${process.env.BackedURL}/aside`);

asideSocket.on('connect', () => {
  console.log('Connected to A-side socket');
});

asideSocket.on('initialData', (data) => {
  console.log('Received initial data:', data);
});

asideSocket.on('sensorUpdate', (data) => {
  console.log('Received sensor update:', data);
});

const bsideSocket = io(`${process.env.BackedURL}/bside`);

bsideSocket.on('connect', () => {
  console.log('Connected to B-side socket');
});

export { asideSocket, bsideSocket };
