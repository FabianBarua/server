import { Router } from 'express'
import { nlpController } from './v1/nlp'

const router = Router()

router.get('/', (_, res) => {
    res.sendFile('index.html', { root: 'src/views' })
})

router.post('/v1/nlp', nlpController)

export default router
