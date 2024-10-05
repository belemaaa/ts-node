import express from 'express'
import { createUser, getUserByEmail } from '../db/users'
import { generateSalt } from '../helpers'
import { authentication } from '../helpers/index';

export const register = async (req: express.Request, res: express.Response) => {
    try{
        const { username, email, password} = req.body
        if (!username || !email || !password){
            return res.sendStatus(400)
        }

        const existingUser = await getUserByEmail(email)
        if (existingUser){
            return res.status(409).json({ error: "User with this email already exists" });
        }

        const salt = generateSalt()
        const user = await createUser({
            username,
            email,
            password,
            authentication: {
                salt,
                password: authentication(salt, password),
            }
        })
        return res.status(200).json(user).end()

    } catch(error){
        console.log(error)
        return res.status(400).json({ error: error})
    }
}