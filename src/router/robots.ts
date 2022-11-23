import { Router } from 'express';
import { RobotController } from '../controllers/robot.js';
import { RobotRepository } from '../data/robot.repository.js';
import { logged } from '../middlewares/interceptors.js';

export const RobotRouter = Router();

const controller = new RobotController(new RobotRepository());

RobotRouter.get('/', controller.getAll.bind(controller));
RobotRouter.get('/:id', controller.get.bind(controller));
RobotRouter.post('/', logged, controller.post.bind(controller));
RobotRouter.patch('/:id', logged, controller.patch.bind(controller));
RobotRouter.delete('/:id', logged, controller.delete.bind(controller));
