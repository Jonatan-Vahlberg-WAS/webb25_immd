import { readFile } from "fs/promises"
import Director from "../models/Director.js"
import Movie from "../models/Movie.js"
import { connectToDb, disconnectFromDb } from "../config/db.js"

const DIRECTORS_PATH = new URL("./../data/directors.json", import.meta.url)
const MOVIES_PATH = new URL("./../data/movies.json", import.meta.url)

async function seedDirectors() {
  if ((await Director.countDocuments()) > 0) return
  const directorsFromFile = JSON.parse(await readFile(DIRECTORS_PATH, "utf8"))
  // Use _id from file to keep ids stable across teardown/reseed
  const toInsert = directorsFromFile.map((d) => ({
    _id: d._id,
    name: d.name,
    birthYear: d.birthYear,
    nationality: d.nationality,
  }))
  await Director.insertMany(toInsert)
  console.log("Directors seeded")
}

async function seedMovies() {
  if ((await Movie.countDocuments()) > 0) return
  const moviesFromFile = JSON.parse(await readFile(MOVIES_PATH, "utf8"))
  // Use _id from file to keep ids stable across teardown/reseed
  const toInsert = moviesFromFile.map((m) => ({
    _id: m._id,
    title: m.title,
    year: m.year,
    genres: m.genres,
    durationMinutes: m.durationMinutes,
    director: m.director,
  }))
  await Movie.insertMany(toInsert)
  console.log("Movies seeded")
}

async function seedIfEmpty() {
  await seedDirectors()
  await seedMovies()
}

const MONGODB_NAME = process.env.DB_NAME || "immd"

connectToDb(MONGODB_NAME)
  .then(() => seedIfEmpty())
  .then(() => disconnectFromDb())
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
