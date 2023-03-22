import ApiErrors from "../handlers/ApiErrors";

export default (err, req, res, next) => {
  if (err instanceof ApiErrors) {
    return res.status(err.status).json({message: err.message})
  }
  return res.status(500).json({message: "500 Error, something went"})
}