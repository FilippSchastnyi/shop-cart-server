import Router from "express";
const router = Router()
import userRoutes from "./User.routes";
import goodsRoutes from "./Goods.routes";


router.use('/user', userRoutes)
router.use('/goods', goodsRoutes)

export default router
