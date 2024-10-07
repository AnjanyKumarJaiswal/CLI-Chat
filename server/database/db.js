import mongoose from "mongoose";

export default  async function ConnectMongoDB(url) {
    return mongoose.connect(url).then((err,data)=>{
        console.log("Successfully Connected to MongoDB...")
    }).catch((err)=>{
        console.log("Your MongoDB is Offline....")
    })
}