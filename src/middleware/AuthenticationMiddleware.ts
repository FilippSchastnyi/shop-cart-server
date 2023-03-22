import jwt from "jsonwebtoken";

export default (req, res, next) => {
  if (req.method === 'OPTIONS'){
    return next()
  }
  const jwtKey: any = process.env.JWT_KEY
  const badToken = () => res.status(401).json({message: 'Not authenticated'})

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token){
      return badToken()
    }
    req.user = jwt.verify(token, jwtKey)
    next()
  }
  catch (e){
    return badToken()
  }
}
