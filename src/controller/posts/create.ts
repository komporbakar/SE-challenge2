import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import moment from "moment";

const { db } = require("../../services/postgresdb");

module.exports = async (req: any, res: Response) => {
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
    const created = await db.query(
      "INSERT INTO posts (title, description, image, user_id, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id, title, description, image, user_id, created_at",
      [title, description, image, userId, date]
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
