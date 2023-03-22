import ApiErrors from "../handlers/ApiErrors";
import GoodsModel from "../models/Goods";
import Utils from "../utils/Utils";

class GoodsController {

  async getAllGoods(req, res, next) {
    const goodsList = await GoodsModel.find({})
    return res.json(goodsList)
  }

  async deleteGoods(req, res, next) {
    const { id } = req.params;
    try {
      await GoodsModel.deleteOne({_id: id})
      res.status(204).send();
    }
    catch (e) {
      return next(ApiErrors.badRequest("Cant delete the item, something went wrong"))
    }
  }

  async createGoods(req, res, next) {
    const {name, price, quantity} = req.body

    if (await Utils.doesDocumentExist(GoodsModel, {name})){
      return next(ApiErrors.badRequest("The goods with this name has already existed"))
    }
    try {
      const goods = await GoodsModel.create({name, price, quantity})
      return res.json(goods)
    }
    catch (e) {
      return next(ApiErrors.internal("Save Error, operation can't be performed"))
    }
  }
  async updateGoods(req, res, next) {
    const goodsList = req.body;
    try {
      for (const goodsData of goodsList) {
        const { id, quantity, price, name } = goodsData;
        await GoodsModel.findOneAndUpdate({ _id: id }, { $set: { quantity, price, name } });
      }
      res.status(200).send();
    }
    catch (e) {
      return next(ApiErrors.internal("Save Error, operation can't be performed"))
    }
  }

}

export default new GoodsController();
