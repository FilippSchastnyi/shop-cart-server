import ApiErrors from "../handlers/ApiErrors";
import bcrypt from "bcrypt"
import Utils from "../utils/Utils";
import UserModel from "../models/User"
import {UserType} from "../types/User";

class UserController {
  async registerUser(req, res, next) {
    const {email, password} = req.body

    if ((await Utils.doesDocumentExist(UserModel, {email}))) {
      return next(ApiErrors.badRequest("This email address is already in use."))
    }

    const hashPassword = await bcrypt.hash(password, 3)

    if (!email || !password) {
      return next(ApiErrors.badRequest('Incorrect email or password.'))
    }

    try {
      await UserModel.create({
        email,
        password: hashPassword
      })
      const token = Utils.generateJWT(email)

      return res.json({email, token})
    }
    catch (error){
      return next(ApiErrors.internal('Server Error ' + error))
    }
  }

  async loginUser(req, res, next) {
    const {email, password} = req.body

    if (!(await Utils.doesDocumentExist(UserModel, {email}))) {
      return next(ApiErrors.badRequest('Incorrect email or password.'))
    }

    const user = await UserModel.findOne({email}) as UserType

    if (!(await bcrypt.compare(password, user.password))) {
      return next(ApiErrors.badRequest('Incorrect email or password.'))
    }

    const token = Utils.generateJWT(user.email)
    return res.json({email, token})
  }
}

export default new UserController();
