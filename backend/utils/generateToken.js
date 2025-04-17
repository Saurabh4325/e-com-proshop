import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
  // JWT -> Json web Token
  // sign(payload{id:123},secret_code form jwt website,expiry date)
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // SET JWT as HTTP-only cookie
  // cookie(Name of cookie, what to store, modes|extra details)
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 1000 * 60 * 60 * 24, // 30d
  });
};
