import { Router } from 'express'

const router = Router()

router.get('/', (_, res) => {
    res.sendFile('index.html', { root: 'src/views' })
})

export default router
