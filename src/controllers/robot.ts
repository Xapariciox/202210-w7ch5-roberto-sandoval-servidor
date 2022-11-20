import { NextFunction, Request, Response } from 'express';
import { Data } from '../data/data.js';
import { HTTPError } from '../interfaces/error.js';
import { Robot } from '../entities/robot';

export class RobotController {
    constructor(public repository: Data<Robot>) {}

    async getAll(_req: Request, resp: Response, next: NextFunction) {
        try {
            const robots = await this.repository.getAll();
            resp.json({ robots });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable Sorry',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async get(req: Request, resp: Response, next: NextFunction) {
        try {
            const data = await this.repository.get(req.params.id);
            resp.json({ data });
        } catch (error) {
            next(this.createHttpError(error as Error));
            return;
        }
    }
    async post(req: Request, resp: Response, next: NextFunction) {
        try {
            const newRobot = await this.repository.post(req.body);
            resp.json({ newRobot });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }
    async patch(req: Request, resp: Response, next: NextFunction) {
        try {
            const updateRobot = await this.repository.patch(
                req.params.id,
                req.body
            );
            resp.json({ updateRobot });
        } catch (error) {
            next(this.createHttpError(error as Error));
        }
    }
    async delete(req: Request, resp: Response, next: NextFunction) {
        try {
            await this.repository.delete(req.params.id);
            resp.json({ id: req.params.id });
        } catch (error) {
            next(this.createHttpError(error as Error));
        }
    }
    createHttpError(error: Error) {
        if (error.message === 'Not found id') {
            const httpError = new HTTPError(404, 'Not Found', error.message);
            return httpError;
        }
        const httpError = new HTTPError(
            503,
            'Service unavailable',
            error.message
        );
        return httpError;
    }
}
