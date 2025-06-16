import mongoose, { Document, Schema,Types} from 'mongoose';

// Define TypeScript interface for User document
export interface HSTRY extends Document {
   userid:Types.ObjectId,
  name:string

}

// Create Mongoose schema
const HSTYSchema = new Schema<HSTRY>(
  {
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:String
    
    
  },
  {
    timestamps: true,
  }
);

// Export the model
const History = mongoose.model<HSTRY>('HSTRY', HSTYSchema);
export default History;
