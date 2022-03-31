import app from './app'
import dotenv from 'dotenv'
dotenv.config()


app.listen(process.env.PORT, () => {
  console.log(`running in http://localhost:${process.env.PORT}`)
})