import Movie from "../models/Movie.js"

// POST /api/directors (skapa)
export async function createMovie(data) {
  try {
    return await Movie.create(data)
  } catch (err) {
    console.error("Unable to create 'Movie'", err)
    return null
  }
}

// GET /api/directors (lista alla)
export async function getAllMovies() {
  try {
    return await Movie.find()
  } catch (err) {
    console.error("Unable to read from 'Movies'", err)
    return []
  }
}

// GET /api/directors/:id (hämta en)
export async function getMovieById(id) {
  try {
    return await Movie.findById(id)
  } catch (err) {
    console.error("Unable to read from 'Movies'", err)
    return null
  }
}

// PUT /api/directors/:id (uppdatera)
export async function updateMovie(id, data) {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    })
    if (!updatedMovie) return null
    return updatedMovie
  } catch (err) {
    console.error("Unable to update 'Movie'", err)
    return null
  }
}

// DELETE /api/directors/:id (ta bort)
export async function deleteMovie(id) {
  try {
    return !!(await Movie.findByIdAndDelete(id))
  } catch (err) {
    console.error("Unable to read from 'Movies'", err)
    return false
  }
}
