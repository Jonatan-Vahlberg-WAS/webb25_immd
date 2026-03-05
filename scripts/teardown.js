import Director from "../models/Director.js"
import Movie from "../models/Movie.js"
import { connectToDb, disconnectFromDb } from "../config/db.js"

const MONGODB_NAME = process.env.DB_NAME || "immd"

async function teardown() {
  await connectToDb(MONGODB_NAME)
  await Movie.deleteMany()
  await Director.deleteMany()
  console.info("Database cleared")
  await disconnectFromDb()
}

teardown().catch((err) => {
  console.error(err)
  process.exit(1)
})
