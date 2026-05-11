import mongoose from 'mongoose';

/** Default local MongoDB — database name `ecommerce`. Override with MONGODB_URL. */
const DEFAULT_LOCAL_URI = 'mongodb://localhost:27017/ecommerce';

const connectDB = async () => {
  const uri = process.env.MONGODB_URL?.trim() || DEFAULT_LOCAL_URI;
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  console.log('MongoDB connected:', uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
};

export default connectDB;
