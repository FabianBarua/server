import express, { Express } from 'express'
import router from '@/routes'
import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(
  cors({
    origin: '*',
    credentials: false
  })
)

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use('/', router)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
