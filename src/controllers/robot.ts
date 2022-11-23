import { NextFunction, Request, Response } from 'express';

import { RobotI } from '../entities/robot.js';
import { BasicRepo, Repo, UserI } from '../entities/user.js';
import { HTTPError } from '../interfaces/error.js';
import { ExtraRequest } from '../middlewares/interceptors.js';

export class RobotController {
    constructor(
        public repository: Repo<RobotI>,
        public userRepo: BasicRepo<UserI>
    ) {}
    async getAll(req: Request, resp: Response, next: NextFunction) {
        try {
            const robots = await this.repository.getAll();
            resp.json({ robots });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async get(req: Request, resp: Response, next: NextFunction) {
        try {
            const robot = await this.repository.get(req.params.id);
            resp.json({ robot });
        } catch (error) {
            next(this.#createHttpError(error as Error));
        }
    }

    async post(req: ExtraRequest, resp: Response, next: NextFunction) {
        try {
            if (!req.payload) {
                throw new Error('Invalid payload');
            }
            const user = await this.userRepo.get(req.payload.id);
            req.body.owner = user.id;
            const robot = await this.repository.post(req.body);
            // repo usuarios user + robot
            // this.userRepo

            resp.status(201).json({ robot });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async patch(req: Request, resp: Response, next: NextFunction) {
        try {
            const robot = await this.repository.patch(req.params.id, req.body);
            resp.json({ robot });
        } catch (error) {
            next(this.#createHttpError(error as Error));
        }
    }

    async delete(req: Request, resp: Response, next: NextFunction) {
        try {
            await this.repository.delete(req.params.id);
            resp.json({});
        } catch (error) {
            next(this.#createHttpError(error as Error));
        }
    }

    #createHttpError(error: Error) {
        if ((error as Error).message === 'Not found id') {
            const httpError = new HTTPError(
                404,
                'Not Found',
                (error as Error).message
            );
            return httpError;
        }
        const httpError = new HTTPError(
            503,
            'Service unavailable',
            (error as Error).message
        );
        return httpError;
    }
}
