import { app } from "./app";
import { startDatabase } from "./database/database"

app.listen(process.env.PORT, async () => {
    await startDatabase()
    console.log('Server is running')
})