//Import Statement
import mongoose from 'mongoose'

//User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    primaryDevice: {
        deviceId: String,
        deviceName: String,
        lastLoginTime: Date
    }
},{timestamps:true})

//User Model
const userModel = mongoose.model('users',userSchema)

//Export Statement
export default userModel;
