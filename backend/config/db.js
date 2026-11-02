import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let mongod = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bloodbank';
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`✅ MongoDB Connected to: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.warn(`⚠️ Could not connect to local MongoDB at ${uri}.`);
    console.log(`🚀 Starting embedded MongoMemoryServer for instant zero-configuration development...`);

    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`✅ Embedded MongoDB Running & Connected at: ${memoryUri}`);
      return conn;
    } catch (memErr) {
      console.error(`❌ Failed to start embedded MongoDB: ${memErr.message}`);
      throw memErr;
    }
  }
};

export const closeDB = async () => {
  await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
};

