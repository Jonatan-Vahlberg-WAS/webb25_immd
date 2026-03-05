import Director from "../models/Director.js"

// POST /api/directors (skapa)
export async function createDirector(data) {
  try {
    return await Director.create(data)
  } catch (err) {
    console.error("Unable to create 'Director'", err)
    return null
  }
}

// GET /api/directors (lista alla)
export async function getAllDirectors() {
  try {
    return await Director.find()
  } catch (err) {
    console.error("Unable to read from 'Directors'", err)
    return []
  }
}

// GET /api/directors/:id (hämta en)
export async function getDirectorById(id) {
  try {
    return await Director.findById(id)
  } catch (err) {
    console.error("Unable to read from 'Director'", err)
    return null
  }
}

// PUT /api/directors/:id (uppdatera)
export async function updateDirector(id, data) {
  try {
    const updatedDirector = await Director.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    })
    if (!updatedDirector) return null
    return updatedDirector
  } catch (err) {
    console.error("Unable to update 'Director'", err)
    return null
  }
}

// DELETE /api/directors/:id (ta bort)
export async function deleteDirector(id) {
  try {
    return !!(await Director.findByIdAndDelete(id))
  } catch (err) {
    console.error("Unable to delete 'Director'", err)
    return false
  }
}
