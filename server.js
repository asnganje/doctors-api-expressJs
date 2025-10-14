import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connect.js"
import doctorsRouter from "./routes/doctorsRouter.js"
import authRouter from "./routes/authRouter.js"

dotenv.config()

const app = express()
const port = process.env.PORT
const url = process.env.MONGO_URI

app.use(express.json())
app.use('/api/v1/doctors', doctorsRouter)
app.use('/api/v1/doctors/auth', authRouter)

const start = async () => {
  try {
    await connectDB(url)
    app.listen(port, ()=> {
      console.log(`Server is listening on port ${port}`);
      
    })
  } catch (error) {
    console.log(error);    
  }
}

start()