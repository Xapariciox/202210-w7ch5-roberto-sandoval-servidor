import { RobotI } from '../entities/robot.js';
import { UserI } from '../entities/user.js';

export type id = number | string; //Types.ObjectId;

// Interface Segregation

export interface BasicRepo<T> {
    get: (id: id) => Promise<T>;
    post: (data: Partial<T>) => Promise<T>;
    find: (data: any) => Promise<T>;
}

export interface ExtraRepo<T> {
    getAll: () => Promise<Array<T>>;
    patch: (id: id, data: Partial<T>) => Promise<T>;
    delete: (id: id) => Promise<id>;
}

export interface UserRepo<T> extends BasicRepo<T> {
    addRobot: (user: UserI, robot: RobotI) => Promise<T>;
}

export interface Repo<T> extends BasicRepo<T> {
    getAll: () => Promise<Array<T>>;
    patch: (id: id, data: Partial<T>) => Promise<T>;
    delete: (id: id) => Promise<id>;
}
