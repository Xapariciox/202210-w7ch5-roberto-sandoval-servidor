import { Router } from 'express';
import { UserController } from '../controllers/user.js';
import { RobotRepository } from '../data/robot.repository.js';
import { UserRepository } from '../data/user.repository.js';

export const usersRouter = Router();

const controller = new UserController(
    UserRepository.getInstance(),
    RobotRepository.getInstance()
);

usersRouter.post('/register', controller.register.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
