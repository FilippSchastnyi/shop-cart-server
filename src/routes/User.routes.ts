import {Router} from 'express'
import UserController from "../controllers/User.controller";
import authenticationMiddleware from "../middleware/AuthenticationMiddleware";

const router = Router()
const userController = UserController

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)

export default router;
