import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log('MONGODB is connected');
  });

  await mongoose.connect(`${process.env.MONGODB_URL}/E-commerce`);
};

export default connectDB;