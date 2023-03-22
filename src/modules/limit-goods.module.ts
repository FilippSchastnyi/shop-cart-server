export const limitGoodsModule = (input, goods) => {
  const { page = 1, limit = 0 } = input;
  const start = (page - 1) * limit;
  return goods.slice(start, start + limit)
}