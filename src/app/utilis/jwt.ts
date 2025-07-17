import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"

export const genarateToken = (payload: JwtPayload, secret: string, expiresIn: string) => {
    const token = jwt.sign(payload, secret, {
        expiresIn
    } as SignOptions)

    return token
}

export const verifiedToken= (token:string , secret : string) => {
     const verifiedToken = jwt.verify(token, secret)
     return verifiedToken
}

