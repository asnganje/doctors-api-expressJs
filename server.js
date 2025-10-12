import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connect.js"

dotenv.config()

const app = express()
const port = process.env.PORT
const url = process.env.MONGO_URI

app.get('/', (req, res) => {
  res.status(200).send("Home Page")
})

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