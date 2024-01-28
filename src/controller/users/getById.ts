import { Response } from "express";
import { StatusCodes } from "http-status-codes";

const { db } = require("../../services/postgresdb");
module.exports = async (req: any, res: Response) => {
  const id = req.user.id;
  console.log(id);
  try {
    const result = await db.query(
      "SELECT id, name, email, image FROM users WHERE id = $1 ",
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
