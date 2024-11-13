//Import Statements
import express from 'express'
import {userRegisterController,userLogInController, getUsers} from '../controllers/userController.js'

//Router Object
const router = express.Router();

//Routes

//User Register Route Method:[POST]
router.post('/register', userRegisterController);

//User LogIn Route Method:[POST]
router.post('/login', userLogInController);

//Get User Route Method:[GET]
router.get('/get-user',getUsers)

//Export Statement
export default router;