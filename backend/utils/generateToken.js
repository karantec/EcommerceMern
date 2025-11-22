// utils/generateToken.js
import jwt from "jsonwebtoken";

export const generateToken = (req, res, userId) => {
  // create token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: req.body?.remember ? `${365 * 24}h` : "24h",
  });

  // set cookie: secure should be true only in production
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // <--- only true in production
    sameSite: "lax", // 'lax' is safer for local testing; use 'none' + secure:true for cross-site + HTTPS
    maxAge: req.body?.remember
      ? 365 * 24 * 60 * 60 * 1000
      : 24 * 60 * 60 * 1000,
  });

  return token; // return so controllers can also send token in JSON for Postman
};
