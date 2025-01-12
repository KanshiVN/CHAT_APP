import jwt from "jsonwebtoken"
export const generateToken = (userId,res)=>{
    const token = jwt.sign({ userId },process.env.JWT_SECRET, { expiresIn: "5d" });

res.cookie('jwt',token,{
    maxAge: 5 * 24 *60 * 60 * 1000,
    httpOnly: true,//Prevents the attacks like XSS cross site scripting
    sameSite:true,//Prevents CSRF attacks
    secure: true//Only works on HTTPS
});
return token;
}