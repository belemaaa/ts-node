import express from 'express'
import { createUser, getUserByEmail } from '../db/user'
import { generateSalt } from '../helpers'
import { authentication } from '../helpers/index';

export const register = async (req: express.Request, res: express.Response): Promise<express.Response> => {
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
        return res.status(201).json(user).end()

    } catch(error){
        console.log(error)
        return res.status(400).json({ error: error})
    }
}

export const login = async (req: express.Request, res: express.Response) => {
    try{
        const {email, password} = req.body
        if (!email || !password){
            return res.status(400).json({ error: "Invalid credentials"})
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')
        if (!user){
            return res.status(401).json({ error: "Unauthorized" })
        }

        const expectedHash = authentication(user.authentication?.salt || '', password)
        if (user.authentication?.password !== expectedHash){
            return res.status(401).json({ error: "Unauthorized" })
        }
        
        //configure session token for the user
        const salt = generateSalt()
        user.authentication.sessionToken = authentication(salt, user._id.toString())
        await user.save()

        res.cookie('AUTH', user.authentication.sessionToken, {
            domain: 'localhost',
            path: '/'
        })
        return res.status(200).json(user).end()

    } catch (error){
        console.log(error)
        return res.status(400).json({ error: error })
    }
}