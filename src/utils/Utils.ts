import jwt from "jsonwebtoken";

class Utils {

  async doesDocumentExist(model, query) {
    return query
      ? await model.findOne(query).then((result) => !!result)
      : false
  }

  generateJWT = (email: string) => {
    return jwt.sign({
        email,
      },
      `${process.env.JWT_KEY}`,
      {expiresIn: '12h'})
  }

  transformModelIdView = (schema) => {
    schema.set('toJSON', {
      transform: (doc, ret) => {
        ret.id = String(ret._id);
        delete ret._id;
        return ret;
      }
    });
  }
}

export default new Utils()