
import mongoose from "mongoose";
export const connectMongoDB = ()=>{
    const uri = "mongodb+srv://moizahsan:scJ3m-6A!gtX*35@cluster0.nqrlq7s.mongodb.net/?retryWrites=true&w=majority"
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB Atlas");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB Atlas:", err);
    });
  
}

