import mongoose, { model, Model, Schema } from "mongoose";

const DB_NAME = "BRAINLY"

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`);
    console.log(`\n MongoDB connected to DB HOST`);
  } catch (error) {
    console.log("MongoDB connection error failed", error);
    process.exit(1);
  }
};

export { connectDB };



const userSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
});

const User = mongoose.model('User', userSchema);

export { User };


const contentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
  userId: [{ type: mongoose.Types.ObjectId, ref: 'User', required: true }]
})
const Content = mongoose.model('Content', contentSchema)
export { Content }

