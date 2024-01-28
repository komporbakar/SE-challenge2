import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
const { db } = require("../services/postgresdb");
const { verifyJWT } = require("../utils/jwt");
const authenticate = async (req: any, res: Response, next: NextFunction) => {
  try {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }
    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Authentication Failed",
      });
    }
    const payload = verifyJWT({ token });
    console.log(payload);

    const checkUser = db.query("SELECT * FROM users WHERE id = $1", [
      payload.id,
    ]);
    if (!checkUser) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Authentication Failed",
      });
    }
    req.user = {
      id: payload.id,
    };

    next();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  authenticate,
};
