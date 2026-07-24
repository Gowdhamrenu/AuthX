import { Request, Response } from "express";

export const registerUser = async (
  req: Request,
  res: Response
) => {

  console.log(req.body);

  res.status(201).json({
    success: true,
    message: "Register endpoint is working",
  });

};