import express, { Router } from 'express';
import { register, login } from '../controllers/authentication';

const authenticationRouter: Router = express.Router();

authenticationRouter.post('/auth/register', register as any);
authenticationRouter.post('/auth/login', login as any)

export default authenticationRouter; 
