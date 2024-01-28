import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
const { db } = require("../../services/postgresdb.ts");

const bcrypt = require("bcrypt");

const { createJWT } = require("../../utils/jwt");
const { createToken } = require("../../utils/createToken");

interface User {
  email: string;
  password: string;
}

module.exports = async (req: Request, res: Response) => {
  const { email, password }: User = req.body;
  try {
    // Validation for email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Field cannot be empty",
      });
    }

    // Check Email
    const checkEmail = await db.query(
      "SELECT id, name, email, password FROM users WHERE email = $1",
      [email]
    );
    if (checkEmail.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Credential Not Match",
      });
    }

    // Check Password
    const checkPassword = await bcrypt.compareSync(
      password,
      checkEmail[0].password
    );
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Credential Not Match",
      });
    }
    console.log(checkEmail);

    const token = createJWT({ payload: createToken(checkEmail[0]) });

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      token,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
