import "dotenv/config"
import app, { PORT } from "./app.js"
import * as db from "./config/db.js"

async function start() {
  await db.connectToDb(process.env.DB_NAME)
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  process.on("SIGTERM", async () => {
    server.close()
    await db.disconnectFromDb()
    process.exit(0)
  })
}

start().catch((err) => {
  console.error("Failed to start:", err)
  process.exit(1)
})
