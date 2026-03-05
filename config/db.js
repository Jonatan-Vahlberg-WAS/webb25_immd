import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/"

export async function connectToDb(dbName) {
  if (mongoose.connection.readyState === 1) return
  const uri = dbName
    ? `${MONGODB_URI.replace(/\/$/, "")}/${dbName}`
    : MONGODB_URI
  await mongoose.connect(uri)
  console.log("Connected to MongoDB", dbName)
}

export async function disconnectFromDb() {
  if (mongoose.connection.readyState === 0) return
  await mongoose.disconnect()
}
