import { model, Schema } from 'mongoose'
import Utils from "../utils/Utils";

const userSchema = new Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
})

Utils.transformModelIdView(userSchema)

export default model('User', userSchema)