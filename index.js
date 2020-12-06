const express = require("express")
const postsRouter = require ("./posts/posts-router")
const welcomeRouter = require("./welcome/welcome-router")

const server = express()
const port = 4000

server.use(express.json())
server.use(postsRouter)
server.use(welcomeRouter)

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
