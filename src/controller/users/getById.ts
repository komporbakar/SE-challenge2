import { Response } from "express";
import { StatusCodes } from "http-status-codes";

const { db } = require("../../services/postgresdb");
module.exports = async (req: any, res: Response) => {
  const id = req.user.id;
  console.log(id);
  try {
    const result = await db.query(
      "SELECT users.id, users.name, users.email, users.image, COUNT(DISTINCT follows.follower_id) AS follower FROM users LEFT JOIN follows ON users.id = follows.following_id WHERE id = $1 GROUP BY users.id",
      [id]
    );
    console.log(result);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
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
