const jwt = require("jsonwebtoken");

// verify token (is valid or not)
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, data) => {
      if (err) {
        return res.status(403).json("Token is Not Valid");
      }
      req.user = data;
      next();
    });
  } else {
    res.status(401).json("You Are Not Authenticated");
  }
};

// verify token and authenticated user
const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json("You are Not Allowed to Do that");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuth,
};
