import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://0.0.0.0:27017/testing'

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('MongoDB is connected!')
  } catch (error) {
    console.log(error)
  }
}
