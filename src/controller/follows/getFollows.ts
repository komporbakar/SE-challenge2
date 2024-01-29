import { Response } from "express";
import { StatusCodes } from "http-status-codes";

const { db } = require("../../services/postgresdb");

module.exports = async (req: any, res: Response) => {
  const userId = req.user.id;
  try {
    const result = await db.query(
      "SELECT follows.following_id, json_build_object('id', users.id, 'name', users.name, 'image', users.image) AS user, follows.created_at FROM follows LEFT JOIN users ON users.id = follows.follower_id WHERE follows.following_id = $1",
      [userId]
    );
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Success",
      data: result,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
