import express from "express"
import Director from "./models/Director.js"
import directorRouter from "./routes/directors.js"
import movieRouter from "./routes/movies.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", async (req, res) => {
  return res.json({
    message: "Healthy?",
  })
})

//TODO: Add routes here
app.use("/api/directors", directorRouter)
app.use("/api/movies", movieRouter)

export default app
export { PORT }
