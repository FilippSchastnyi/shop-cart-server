import { model, Schema } from 'mongoose'
import Utils from "../utils/Utils";

const goodsSchema = new Schema({
  name: {type: String, unique: true, required: true},
  price: {type: Number, required: true},
  quantity: {type: Number, required: true},
})

Utils.transformModelIdView(goodsSchema)

export default model('Goods', goodsSchema)