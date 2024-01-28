import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import moment from "moment";

const { db } = require("../../services/postgresdb");

module.exports = async (req: any, res: Response) => {
  const { comment, post_id } = req.body;
  const date = moment().format();
  try {
    const userId: Number = req.user.id;
    if (!comment || !post_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Field cannot be empty",
      });
    }
    const checkPost = await db.query("SELECT * FROM posts WHERE id = $1", [
      post_id,
    ]);
    console.log(checkPost);
    if (!checkPost[0] || checkPost.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Post Not Found",
      });
    }

    const created = await db.query(
      "INSERT INTO comments (comment, post_id, user_id, created_at) VALUES ($1, $2, $3, $4) RETURNING id, comment, post_id, user_id, created_at",
      [comment, post_id, userId, date]
    );
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Created Successfully",
      data: created[0],
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
