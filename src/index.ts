import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'

// Import routes
import Routes from './routes'

// Initiate Elysia
const app = new Elysia().use(
  cors({
    origin: 'http://localhost:3000'
  })
)

// Route home
app.get('/', () => 'Hello Elysia!')

// Add routes
app.group('/api', app => app.use(Routes))

// Set port
const port = 3001

// Start server on port
app.listen(port, () => {
  console.log(`🦊 Elysia is running at http://localhost:${port}`)
})
