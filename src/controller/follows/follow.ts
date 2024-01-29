import { Response } from "express";
import { StatusCodes } from "http-status-codes";

const { db } = require("../../services/postgresdb");

module.exports = async (req: any, res: Response) => {
  const { following_id } = req.body;
  try {
    const userId = req.user.id;
    const checkUser = await db.query(
      "SELECT * FROM follows WHERE follower_id = $1 AND following_id = $2",
      [userId, following_id]
    );
    if (userId === following_id) {
      return res.status(400).json({
        success: false,
        message: "You Can't Follow Yourself",
      });
    }

    if (checkUser.length === 0) {
      const follow = await db.query(
        "INSERT INTO follows (follower_id, following_id) VALUES ($1, $2) RETURNING *",
        [userId, following_id]
      );
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Follow Successfully",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Already Follow",
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
