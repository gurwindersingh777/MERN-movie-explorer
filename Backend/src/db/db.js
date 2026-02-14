import mongoose from "mongoose";

async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`)
    console.log("MONGODB CONNECTED SUCCESSFULLY - DB HOST :", connectionInstance.connection.host);
  } catch (error) {
    console.log("MONGODB CONNECTION FAILED ", error);
    process.exit(1)
  }
}

export default connectDB;