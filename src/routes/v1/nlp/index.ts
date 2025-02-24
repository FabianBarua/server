import { Request, Response } from "express"

export const nlpController = async (_: Request, res: Response) => {

    await new Promise((resolve) => setTimeout(resolve, 1000))

    res.json({
        message: 'Hello, World!'
    })

}