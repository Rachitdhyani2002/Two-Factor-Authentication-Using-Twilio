//Import Statement
import userModel from '../database/models/userModel.js'
import JWT from 'jsonwebtoken'
import twilio from 'twilio'
import { hashPassword, comparePassword } from '../helpers/encryption.js'

//Twilio Setup
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

//Register User Function
export const userRegisterController = async (req, res) => {
    try {
        //Destructuring Data
        const { name, email, password } = req.body

        //Checking If User Already Exist
        const existingUser = await userModel.findOne({ email })

        //If User Is Already Registered
        if (existingUser) { return res.status(409).send({ success: false, message: "User Already Exist Please LogIn" }) }

        //Hashing User Password
        const hashedUserPassword = await hashPassword(password);

        //Registering A New User To Database
        const newUser = await new userModel({ name, email, password: hashedUserPassword }).save()

        //Sending Ok Response To Client
        res.status(200).send({ success: true, message: "User Registration SuccessFully", newUser })
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Error While Registering User", error: error })
        console.error(`Error While Registering User ${error}`)
    }
}

//User LogIn Function
export const userLogInController = async (req, res) => {
    try {
        //Destructuring Data
        const { email, password, deviceId, deviceName, phoneNumber } = req.body;

        //Checking If User Exist 
        const user = await userModel.findOne({ email })

        //If User Does Not Exist
        if (!user) { return res.status(409).send({ success: false, message: "Please Register Yourself First" }) }

        //Matching User Password And Previously Stored Hashed Password
        const match = await comparePassword(password, user.password)

        //If Password Does Not Match
        if (!match) { return res.status(409).send({ success: false, message: "Invalid Password" }) }

        //Check if primaryDevice exists
        if (!user.primaryDevice) {
            user.primaryDevice = { deviceId, deviceName, lastLoginTime: new Date() };
            await user.save();

            return res.status(200).send({ success: true, message: "First Login Successful", user });
        }

        //If This Is A New Device, Send 2FA Notification
        if (user.primaryDevice.deviceId !== deviceId) {
            await client.messages.create({
                body: `A login attempt was made on a new device (${deviceName}). Reply "YES" to approve or "NO" to deny.`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phoneNumber
            });

            return res.status(403).json({ message: "Approval needed on primary device" });
        }

        // If same device, update lastLoginTime
        user.primaryDevice.lastLoginTime = new Date();
        await user.save();

        //Generating JsonWebToken For User
        const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        //Sending Ok Response To User 
        res.status(200).send({ success: true, message: "User Successfully Logged In", user })


    }
    catch (error) {
        res.status(500).send({ success: false, message: "Error While LogIn", error: error })
        console.error(`Error While LogIn ${error}`)
    }
}

//Get All Users
export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password'); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};