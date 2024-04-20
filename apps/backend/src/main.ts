import express from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import { connectDB } from './config/db'
import { router as todoRoute } from './routes/todo'
import { router as userRoute } from './routes/auth'

const swaggerDocument = YAML.load('./swagger.yml')

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000

const app = express()

app.use('/todos', todoRoute)
app.use('/auth', userRoute)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(PORT, () => {
  connectDB().then(() => {
    console.log(`Server is running on port ${PORT}`)
  })
})
