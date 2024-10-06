import express, { Router } from 'express';
import { register } from '../controllers/authentication';

const authenticationRouter: Router = express.Router();

authenticationRouter.post('/auth/register', register as any);

export default authenticationRouter; 
