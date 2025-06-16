import mongoose, { Document, Schema } from 'mongoose';

// Define TypeScript interface for User document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// Create Mongoose schema
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Export the model
const User = mongoose.model<IUser>('User', userSchema);
export default User;
