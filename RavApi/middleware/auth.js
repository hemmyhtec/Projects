const jwt = require("jsonwebtoken")

module.exports = {
    authenticateToken(req, res, next) {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
    
      if (token == null) return res.sendStatus(401);
    
      jwt.verify(token, "Snippet_ScretKEY", (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
      });
    },

    generateAccessToken(username) {
      return jwt.sign({ data: username }, "Snippet_ScretKEY", {
        expiresIn: "5h",
      });
    }

} 
