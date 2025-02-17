import mongoose from "mongoose";

const DB_NAME = "BRAINLY"

const connectDB = async () => {
    try{

      //const conectionInstant = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

    const conectionInstant = await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`);
      console.log(`\n MongoDB connected !! DB HOST`)
    }catch(error){
        console.log("MongoDB connection error failed",error);
        process.exit(1);
    }
}

export default connectDB;