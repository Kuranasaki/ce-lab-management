import mongoose from 'mongoose';

// Connect to the MongoDB database
const mongoDBURI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';
// console.log(mongoDBURI);

mongoose
  .connect(mongoDBURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

export default mongoose;
