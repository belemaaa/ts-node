import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config()
const SECRET = process.env.SECRET

export const random = () => {
    return crypto.randomBytes(128).toString('base64') //generates salt
}

export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/'))
                 .update(SECRET || 'undefined')
                 .digest('hex')
}