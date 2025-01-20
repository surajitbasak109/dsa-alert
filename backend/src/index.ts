import express, { Express, Request, Response, json } from "express"
import { createServer } from 'node:http'
import allowOrigin from "@middlewares/allow-origin";
import apiRouter from "@routes/api";
const PORT = process.env.PORT || 3500;
const app: Express = express()
const server = createServer(app)

app.use(allowOrigin)
app.use(json());
app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Welcome, buddy"
    })
})

app.use('/api', apiRouter)

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
