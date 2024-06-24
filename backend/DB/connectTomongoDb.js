import mongoose from "mongoose";

export const connecttomongo=async()=>{
try{
await mongoose.connect(process.env.MONGO_DB_URL);
console.log("connected to mongoDB");

}

catch(error){
console.log("Error in connecting to mongoDB", error.message);

}



}