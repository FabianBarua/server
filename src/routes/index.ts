import { Router } from 'express'
import { nlpController } from '@/controllers/nlp/index'
import { llama } from '@/controllers/ia'

const router = Router()

router.get('/', (_, res) => {
    res.sendFile('index.html', { root: 'src/views' })
})

router.post('/v1/nlp', nlpController)
router.post('/v1/ia', llama)

export default router
