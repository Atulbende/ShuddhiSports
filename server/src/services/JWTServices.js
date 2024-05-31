import jwt from "jsonwebtoken"
export class JWTServices{
 static   async generateRefreshAccessToken  (_id) {
        try {

            const accessToken = await this.generateAccessToken(_id);
            const refreshToken = await this.generateRefreshToken(_id);
            return [accessToken, refreshToken];
        } catch (error) {
            console.log('generateRefreshAccessToken:', error)
        }
    }
    static async authenticateTokens(req,_id){
        const _cookies=req.cookies;
        if(_cookies._rtid){
           const accessToken= await this.generateAccessToken(_id);
           return [accessToken];
        }else{
          const [accessToken,refreshToken]=  await this.generateRefreshAccessToken(_id);
          return [accessToken,refreshToken];
        }
    }
    static  async verifyAccessToken(_token){
    try {
        
        return jwt.verify(_token,process.env.JWT_SECRET);
    } catch (error) {
      console.log('verifyAccessToken:',error)
    }
    }
    static async  verifyRefreshToken(_token){
        try {
            return jwt.verify(_token,process.env.JWT_SECRET);
    } catch (error) {
        console.log('verifyRefreshToken:',error)
    }
    }
    static  async  generateAccessToken(_id) {
        try {
             const token = jwt.sign({ data: _id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_ACCESS_TOKAN });
            return token;
        } catch (error) {
            console.log(error)
           
        }
    }
    static async generateRefreshToken  (_id) {
        try {
            const refreshtoken = jwt.sign({ data: _id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_REFRESH_TOKEN });
            return refreshtoken;
        } catch (error) {
            console.log(error)
    
        }
    }
}


 