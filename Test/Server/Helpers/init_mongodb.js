import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.dbName,
  useNewUrlParse: true,
  useUnifiedToplogy: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(() => {
    console.log("Mongodb is connected")
}).catch((err) =>
    console.log(err.message)
);

mongoose.connection.on('connected', () => {
     console.log('Mongoose connect to db')
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongodb disconnected...');
});

mongoose.connection.on('error', (err) => {
    console.log(err.message);
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

export default mongoose;