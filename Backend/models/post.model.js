import { pool } from "../database/db.js"

const findAll = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

const findById = async (id) => {
  const query = "SELECT * FROM posts WHERE id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const create = async (post) => {
  const query = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
const { rows } = await pool.query(query, [post.titulo, post.img, post.descripcion, 0,]);
return rows[0];
};

const remove = async (id) => {
  const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const like = async (id) => {
  const query = "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  console.log("post likeado", rows[0]);
  return rows[0];
};

export const postModel = {
  findAll,
  findById,
  create,
  remove,
  like,
};


