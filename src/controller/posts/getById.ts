import { Response } from "express";
import { StatusCodes } from "http-status-codes";

const { db } = require("../../services/postgresdb");
module.exports = async (req: any, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const result = await db.query(
      "SELECT posts.id, posts.title, posts.description, posts.image AS post_image, json_build_object('id', users.id, 'name', users.name, 'image', users.image) AS author, COALESCE(json_agg(json_build_object('comment_id', comments.id, 'comment', comments.comment, 'user', json_build_object('id', comment_users.id, 'name', comment_users.name, 'image', comment_users.image), 'created_at', comments.created_at) ORDER BY comments.created_at DESC) FILTER (WHERE comments.id IS NOT NULL), '[]') AS comments FROM posts LEFT JOIN users ON posts.user_id = users.id LEFT JOIN comments ON posts.id = comments.post_id LEFT JOIN users AS comment_users ON comments.user_id = comment_users.id WHERE posts.id = $1 GROUP BY posts.id, users.id",
      [id]
    );
    console.log(result);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Success",
      data: result[0],
    });
  } catch (error: any) {
    // console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
