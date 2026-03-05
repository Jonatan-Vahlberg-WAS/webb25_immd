import mongoose from "mongoose"

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    genres: { type: [String], required: true },
    durationMinutes: { type: Number, required: true },
    director: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

movieSchema.index({ title: "text", director: "text" })

const Movie = mongoose.model("Movie", movieSchema)

export default Movie
