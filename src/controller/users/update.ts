import { Response } from "express";
import { StatusCodes } from "http-status-codes";

const { db } = require("../../services/postgresdb");

module.exports = async (req: any, res: Response) => {
  let { name, email, image } = req.body;
  try {
    const id = req.user.id;

    const checkUser = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (!checkUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User Not Found",
      });
    }
    name = name ?? checkUser[0].name;
    email = email ?? checkUser[0].email;
    console.log(checkUser);
    const update = await db.query(
      "UPDATE users SET name = $1, email = $2, image = $3 WHERE id = $4 RETURNING id, name, email, image",
      [name, email, image, id]
    );
    if (!update) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Bad Request",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Success",
      data: update[0],
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
