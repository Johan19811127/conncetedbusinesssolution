import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI environment variable.');
}

declare global {
  var mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

const cache = global.mongooseCache ?? { conn: null, promise: null };

global.mongooseCache = cache;

export async function connectToDatabase() {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB ?? 'connected_crm'
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
