import express from 'express'
import { getUsers, getUserById, deleteUserById } from '../db/user'


export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try{
        const users = await getUsers()
        if (users.length === 0){
            return res.status(200).json({ users: [] })
        }
        return res.status(200).json({ users: users})
    } 
    catch (error){
        console.log(error)
        return res.status(400).json({ error: error })
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params
        const existingUser = await getUserById(id)
        if (!existingUser){
            return res.status(404).json({ error: "User not found" })
        }

        //delete if user exists
        let result = await deleteUserById(id)
        return res.status(200).json({ message: "Success"})
    }
    catch (error){
        console.log(error)
        return res.status(400).json({ error: error })
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params
        const { username } = req.body
        if (!username){
            return res.sendStatus(400)
        }

        const user = await getUserById(id)
        if (!user){
            return res.sendStatus(404)
        }
        user.username = username
        await user.save()

        return res.status(200).json(user).end()

    }
    catch (error){
        console.log(error)
        return res.status(400).json({ error: error })
    }
}