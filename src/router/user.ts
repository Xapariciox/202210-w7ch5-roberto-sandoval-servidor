import { Router } from 'express';
import { UserController } from '../controllers/user';
import { UserRepository } from '../data/user.repository';

export const usersRouter = Router();

const controller = new UserController(new UserRepository());

usersRouter.post('/register', controller.register.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
