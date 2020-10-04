const express = require("express")
const router = express.Router()
const posts = require("../data/db")

//GET request for all posts in the database
router.get("/api/posts", (req, res) => {
    posts.find()
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((error) => {
        console.log(error) 
        res.status(500).json({
            error: "The posts information could not be retrieved.",
        })
    })
})

//GET request for all posts in database by id
router.get("/api/posts/:id", (req, res) => {
    posts.findById(req.params.id)

    .then((post) => {
        if (post) {
            return res.status(200).json(post)
        } else {
            return res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch((error) => {
        console.log(error) 
        res.status(500).json({
            error: "The post information could not be retrieved."
        })
    })
})

//GET request for comments by post id
router.get("/api/posts/:id/comments", (req, res) => {
    posts.findPostComments(req.params.id)

    .then((post) => {
        if (post) {
            return res.status(200).json(post)
        } else {
            return res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch((error) => {
        console.log(error) 
        res.status(500).json({
            error: "The comments information could not be retrieved."
        })
    })
})
//POST request to add a posts to the api
router.post("/api/posts", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }

    posts.insert(req.body)

        .then((post) => {
            res.status(201).json(post)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                error: "There was an error while saving the post to the database"
            })
        })
})

//POST request to add a comment to a post using a specific id
router.post("/api/posts/:id/comments", (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({
            errorMessage: "Please provide text for the comment."
        })
    }

    posts.insertComment({post_id: req.params.id, ...req.body})

        .then((comment) => {
            res.status(201).json(comment)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                error: "There was an error while saving the comment to the database"
            })
        })
})
//DELETE request to delete a post 
router.delete("/api/posts/:id", (req, res) => {
    posts.remove(req.params.id)

    .then((count) => {
        if (count > 0) {
            return res.status(200).json({
                message: "The post has been deleted."
            })
        }  else {
            return res.status(404).json({
                message: "The post with the specified ID does not exist,"
            })
        }
    })
    .catch((error) => {
        console.log(error) 
        res.status(500).json({
            error: "The post could not be removed."
        })
    })
})
//PUT request to edit a post
router.put("/api/posts/:id", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            errorMessage: "Please provide a title and contents for the post."
        })
    }

    posts.update(req.params.id, req.body)
    
        .then((post) => {
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                error: "The post information could not be modified"
            })
        })
})

module.exports = router