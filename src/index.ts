import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from "./routes/_index";
import errorHandler from "./middleware/ErrorHandlingMiddleware";
import * as mongoose from "mongoose";

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors({origin: '*'}))
app.use(express.json())
app.use('/api', router)

/**  error handling should be in the end of the middleware including **/
app.use(errorHandler)

const startServer = async () => {
    await mongoose.connect(process.env.DB_CONNECT as string)
    await app.listen(PORT,  ()=>{
      console.log('The server has been started on the ' + PORT + ' PORT, Happy hacking >:D')
    })
}

startServer()
  .catch((error) => {
    console.log(error)
  })
