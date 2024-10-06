import express, { Router } from 'express';
import { deleteUser, getAllUsers } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';


const userRouter: Router = express.Router();

userRouter.get('/getAllUsers', isAuthenticated as any, getAllUsers as any);
userRouter.delete('/users/:id', isAuthenticated as any, isOwner as any, deleteUser as any)

export default userRouter; 
