import { User, UserI } from '../entities/user.js';
import { passwdEncrypt } from '../services/auth.js';
import { BasicRepo, id } from './data.js';

export class UserRepository implements BasicRepo<UserI> {
    static instance: UserRepository;
    public static getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

    #Model = User;

    async get(id: id): Promise<UserI> {
        const result = await this.#Model.findById(id);
        if (!result) throw new Error('Not found id');
        return result;
    }

    async post(data: Partial<UserI>): Promise<UserI> {
        if (typeof data.passwd !== 'string') throw new Error('');
        data.passwd = await passwdEncrypt(data.passwd);
        const result = await this.#Model.create(data);
        return result;
    }

    async find(search: { [key: string]: string }): Promise<UserI> {
        const result = await this.#Model.findOne(search);
        if (!result) throw new Error('Not found id');
        return result;
    }
}
