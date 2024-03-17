import mongoose from 'mongoose';

const uri =
  process.env.MONGODB_URI ||
  'mongodb+srv://aamuravyev28:Aam28052007@cluster0.asrnanq.mongodb.net/';

export const connectDB = async () => {
  try {
    await mongoose.connect(uri, {});
    console.log('Mongo is connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
