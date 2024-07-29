import jwt from "jsonwebtoken";

const generateTokenandsetCookie = (userId, res) => {
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })

    //setcookie
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: (1000 * 60 * 60 * 24 * 15),
        sameSite: "strict",
        secure: true
      });
    };  
    export default generateTokenandsetCookie
