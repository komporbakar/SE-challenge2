import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import moment from "moment";

const bcrypt = require("bcrypt");
const { db } = require("../../services/postgresdb");

interface User {
  name: string;
  email: string;
  password: string;
}

module.exports = async (req: Request, res: Response) => {
  const { name, email, password }: User = req.body;
  const date = moment().format();
  try {
    // Validation for name, email and password
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Field cannot be empty",
      });
    }

    // Check email
    const checkEmail = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (checkEmail.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exist",
      });
    }

    const hash = await bcrypt.hashSync(password, 12);
    // query insert data users
    const querySave = `INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, $4) RETURNING id, name, email`;
    const saved = await db.query(querySave, [name, email, hash, date]);
    console.log(saved);
    if (!saved || saved.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
      });
    }

    // Response
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Created Successfully",
      data: saved[0],
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
