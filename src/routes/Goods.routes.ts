import {Router} from 'express'
import GoodsController from "../controllers/Goods.controller";

const router = Router()

router.get('/', GoodsController.getAllGoods)
router.post('/', GoodsController.createGoods)
router.delete('/:id', GoodsController.deleteGoods)
router.put('/', GoodsController.updateGoods)

export default router;
