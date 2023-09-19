const jwt = require("jsonwebtoken")

// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers.token   //req.headers.Authorization 
//     if (authHeader) {
//         const token = authHeader.split(" ")[1]  // so we can remove the word "Bearer"
//         jwt.verify(token, process.env.JWT_SEC, (err, user) => {
//             if (err) res.status(403).json("Token is not valid")
//             req.user = user
//             next()
//         })
//     } else {
//         return res.status(401).json("You are not authentificated!")
//     }
// }

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1] // so we can remove the word "Bearer"
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        console.log(err)
        return res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("You are not allowed to do that!")
        }
    })
}

// we created this function so we can control who can add/delete/update products (the Admin ofc)
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("You are not allowed to do that!")
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin}