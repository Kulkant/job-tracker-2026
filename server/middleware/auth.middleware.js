import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const payload = jwt.verify(token, process.env.JWT_SECRET);

      req.user = payload.userId;

      next();
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "No authorized - invalid token" });
    }
  } else {
    return res
      .status(500)
      .json({ success: false, message: "Not authorized - no token" });
  }
};
