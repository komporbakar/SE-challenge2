import { Response } from "express";
import { StatusCodes } from "http-status-codes";
const { db } = require("../../services/postgresdb");

module.exports = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const checkComment = await db.query(
      "SELECT * FROM comments WHERE id = $1",
      [id]
    );
    console.log(checkComment);
    if (!checkComment[0] || checkComment.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Comment Not Found",
      });
    }
    if (checkComment[0].user_id !== userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const deleteComment = await db.query(
      "DELETE FROM comments WHERE id = $1 AND user_id = $2",
      [id, userId]
    );
    if (!deleteComment) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Bad Request",
      });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Delete Successfully",
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
