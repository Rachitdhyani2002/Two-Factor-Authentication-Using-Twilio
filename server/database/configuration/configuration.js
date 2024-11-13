//Import Statements
import mongoose from "mongoose";

//Connection With Database Function
export const connectDb=async()=>{
       try{
            const connect = await mongoose.connect(`${process.env.MONGO_URL}`)
            console.info(`Successfully Connected With DataBase ${connect.connection.name} ${connect.connection.host}`.bgCyan.white)
       }
       catch(error){
        console.error(`Error While Connecting With Database ${error}`.bgRed.white)
       }
}