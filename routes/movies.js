import { Router } from "express"
import {
  getAllMovies,
  deleteMovie,
  updateMovie,
  getMovieById,
  createMovie,
} from "../db/movies.js"

const movieRouter = Router()

// POST /api/movies (skapa)
movieRouter.post("/", async (req, res) => {
  const { title, year, genres, durationMinutes, director } = req.body
  if (
    !title ||
    typeof title !== "string" ||
    !year ||
    typeof year !== "number" ||
    !genres ||
    !Array.isArray(genres) ||
    genres.length === 0 ||
    !durationMinutes ||
    typeof durationMinutes !== "number" ||
    !director ||
    typeof director !== "string"
  ) {
    return res.status(400).json({
      message:
        "Title, year, genres, duration in minutes and director are required",
    })
  }
  const movie = await createMovie({
    title,
    year,
    genres,
    durationMinutes,
    director,
  })

  return res.status(201).json(movie)
})

// GET /api/movies (lista/filtrera)
movieRouter.get("/", async (req, res) => {
  let movies = await getAllMovies()

  const director = req.query.director?.toString().toLowerCase()

  if (director) {
    movies = movies.filter((m) => m.director.toLowerCase() === director)
  }

  return res.json(movies)
})

// GET /api/movies/:id (hämta en)
movieRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  const movie = await getMovieById(id)
  if (!movie) {
    return (
      res.status(404).json /
      {
        message: "Movie does not exist",
      }
    )
  }

  return res.json(movie)
})

// PUT /api/movies/:id (uppdatera)
movieRouter.put("/:id", async (req, res) => {
  const id = req.params.id
  const { title, year, genres, durationMinutes, director } = req.body
  if (!title || typeof title !== "string") {
    return res.status(400).json({
      message: "New movie title is required",
    })
  }
  if (!year || isNaN(year)) {
    return res.status(400).json({
      message: "New movie year needs to be a valid number",
    })
  }
  if (!genres || !Array.isArray(genres)) {
    return res.status(400).json({
      message: "New movie genres is required",
    })
  }
  if (!durationMinutes || isNaN(durationMinutes)) {
    return res.status(400).json({
      message: "New movie durationMinutes needs to be a valid number",
    })
  }
  if (!director || typeof director !== "string") {
    return res.status(400).json({
      message: "New movie director is required",
    })
  }

  const updatedMovie = await updateMovie(id, {
    title,
    year,
    genres,
    durationMinutes,
    director,
  })
  if (!updatedMovie) {
    return res.status(404).json({
      message: "Movie does not exist",
    })
  }

  return res.status(200).json(updatedMovie)
})

// DELETE /api/movies/:id (ta bort)
movieRouter.delete("/:id", async (req, res) => {
  const id = req.params.id
  const deleted = await deleteMovie(id)
  if (!deleted) {
    return res.status(404).json({
      message: "Movie was not deleted or found",
    })
  }

  return res.status(204).json()
})

export default movieRouter
