import express from 'express'
import {PORT} from "./config.js"
import usersRoutes from "./routes/users.routes.js"
import departmentsRoutes from "./routes/departments.routes.js"
import morgan from 'morgan'


const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(usersRoutes)
app.use(departmentsRoutes)

app.listen(PORT);
console.log("Server on port",PORT)