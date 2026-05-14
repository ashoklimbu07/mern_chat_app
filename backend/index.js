import express from "express"
import dotenv from "dotenv"
import { connectMongoDb } from "./config/db.js"

dotenv.config()

const port = process.env.PORT || 3000
const app = express()

// middlewares
app.use(express.json())

// routes

// start server after DB connects
connectMongoDb().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
})
