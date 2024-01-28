import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import moment from "moment";

const { db } = require("../../services/postgresdb");

module.exports = async (req: any, res: Response) => {
  const { id } = req.params;
  const { title, description, image } = req.body;
  const date = moment().format();
  try {
    const userId = req.user.id;
    if (!title || !description) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Field cannot be empty",
      });
    }

    const checkPost = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
    console.log(checkPost);
    if (!checkPost[0] || checkPost.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Post Not Found",
      });
    }

    // Check User Id
    if (checkPost[0].user_id !== userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatePost = await db.query(
      "UPDATE posts SET title = $1, description = $2, image = $3, updated_at = $4 WHERE id = $5 RETURNING id, title, description, image, user_id, created_at",
      [title, description, image, date, id]
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Update Successfully",
      data: updatePost[0],
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
