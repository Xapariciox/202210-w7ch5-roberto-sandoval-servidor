import { NextFunction, Request, Response } from 'express';
import { RobotRepository } from '../data/robot.repository';
import { CustomError, HTTPError } from '../interfaces/error';
import { mockData } from '../mock/mock';
import { RobotController } from './robot';

jest.mock('../data/robot.repository');

describe('Given RobotController', () => {
    describe('When RobotController is valid', () => {
        RobotRepository.prototype.getAll = jest
            .fn()
            .mockResolvedValue(mockData);
        RobotRepository.prototype.get = jest
            .fn()
            .mockResolvedValue(mockData[0]);
        RobotRepository.prototype.post = jest
            .fn()
            .mockResolvedValue('newRobot');
        RobotRepository.prototype.patch = jest
            .fn()
            .mockResolvedValue(mockData[0].name);
        RobotRepository.prototype.delete = jest
            .fn()
            .mockResolvedValue(mockData);

        const repository = new RobotRepository();

        const robotController = new RobotController(repository);
        const req: Partial<Request> = {};
        const resp: Partial<Response> = {
            json: jest.fn(),
        };
        const next: NextFunction = jest.fn();

        test('Then getAll must return a promise of robot array', async () => {
            await robotController.getAll(
                req as Request,
                resp as Response,
                next
            );
            expect(resp.json).toHaveBeenCalledWith({ robots: mockData });
        });
        test('Then get must return a promise of robot', async () => {
            req.params = { id: '0' };
            await robotController.get(req as Request, resp as Response, next);
            expect(resp.json).toHaveBeenCalledWith({ data: mockData[0] });
        });

        test('Then post must return a promise of new robot', async () => {
            await robotController.post(req as Request, resp as Response, next);
            expect(resp.json).toHaveBeenCalledWith({ newRobot: 'newRobot' });
        });
        test('Then patch must return a promise of robot update', async () => {
            req.params = { id: '0' };
            req.body = {
                name: 'newRobot',
            };
            await robotController.patch(req as Request, resp as Response, next);
            expect(resp.json).toHaveBeenCalledWith({ updateRobot: 'Walle' });
        });
        test('Then delete must return a promise of delete an robot', async () => {
            req.params = { id: '1' };
            await robotController.delete(
                req as Request,
                resp as Response,
                next
            );
            expect(resp.json).toHaveBeenCalledWith({ id: req.params.id });
        });
    });

    describe('When RobotController is not valid', () => {
        let error: CustomError;
        beforeEach(() => {
            error = new HTTPError(404, 'Not found', 'Not found id');
        });
        RobotRepository.prototype.getAll = jest
            .fn()
            .mockRejectedValue(['Robot']);
        RobotRepository.prototype.get = jest.fn().mockRejectedValue('Robot');
        RobotRepository.prototype.post = jest.fn().mockRejectedValue(['Robot']);
        RobotRepository.prototype.patch = jest
            .fn()
            .mockRejectedValue(['Robot']);
        RobotRepository.prototype.delete = jest
            .fn()
            .mockRejectedValue(['Robot']);

        const repository = new RobotRepository();

        const robotController = new RobotController(repository);
        const req: Partial<Request> = {};
        const resp: Partial<Response> = {
            json: jest.fn(),
        };
        const next: NextFunction = jest.fn();

        test('should return an error', async () => {
            error.message = 'Not found id';
            error.statusCode = 404;
            error.statusMessage = 'Not found';
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(HTTPError);
            expect(error).toHaveProperty('statusCode', 404);
            expect(error).toHaveProperty('statusMessage', 'Not found');
            expect(error).toHaveProperty('message', 'Not found id');
            expect(error).toHaveProperty('name', 'HTTPError');
        });

        test('Then getAll should return an error', async () => {
            await robotController.getAll(
                req as Request,
                resp as Response,
                next
            );
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(HTTPError);
        });

        test('Then get should return an error', async () => {
            await robotController.get(req as Request, resp as Response, next);
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(HTTPError);
        });

        test('Then post should return an error', async () => {
            await robotController.post(req as Request, resp as Response, next);
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(HTTPError);
        });
        test('Then patch should return an error', async () => {
            await robotController.patch(req as Request, resp as Response, next);
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(HTTPError);
        });
        test('Then delete should return an error', async () => {
            await robotController.delete(
                req as Request,
                resp as Response,
                next
            );
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(HTTPError);
        });
    });
});
