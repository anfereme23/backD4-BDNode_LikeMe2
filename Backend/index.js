import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { postModel } from "./models/post.model.js"
import "dotenv/config";

const app = express()

// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.json())

// <--- Habilitamos CORS
app.use(cors())

// GET /posts
app.get("/posts", async (req, res) => {
    try {
        const posts = await postModel.findAll()
        return res.json(posts)
    } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
    }
})

// GET /posts/:id
app.get("/posts/:id", async (req, res) => {
    const id = req.params.id;

    try {
      const post = await postModel.findById(id);
      if (!post) {
        res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
});

// POST /posts
app.post("/posts", async (req, res) => {
     const { titulo, img, descripcion } = req.body;

     if (!titulo || !img || !descripcion) {
       return res.status(400).json({ message: "Data is required" });
     }
     const newPost = {
       titulo,
       img,
       descripcion,
     };
     try {
       const post = await postModel.create(newPost);
       return res.json(post);
     } catch (error) {
         console.log(error);
         return res.status(500).json({ message: "Internal server error" });
     }
});


// DELETE /posts/:id
app.delete("/posts/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const post = await postModel.remove(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.json({ message: "Post deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});