const JWT = require("jsonwebtoken");
const User = require("../models/user");

//JWTが正常か検証
const tokenDecode = (req) => {
  //console.log(req.headers["authorization"]);
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    try {
      const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
      return decodedToken;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

//JWT認証を検証する
exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  console.log(tokenDecoded);
  if (tokenDecoded) {
    //一致するユーザーを探す
    const user = await User.findById(tokenDecoded.id);
    if (!user) {
      return res.status(401).json("権限がありません");
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json("権限がありません");
  }
};
