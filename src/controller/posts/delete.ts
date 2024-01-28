import { Response } from "express";
import { StatusCodes } from "http-status-codes";

const { db } = require("../../services/postgresdb");

module.exports = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const userId = req.user.id;

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

    const deletePost = await db.query("DELETE FROM posts WHERE id = $1 ", [id]);
    if (!deletePost) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Bad Request",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Delete Successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
