import { model } from 'mongoose';
import { User, userSchema } from '../entities/user.js';
import { passwdEncrypt } from '../services/auth.js';
import { BasicRepo, id } from './data.js';

export class UserRepository implements BasicRepo<User> {
    #Model = model('Coffee', userSchema, 'coffees');

    async get(id: id): Promise<User> {
        const result = await this.#Model.findById(id);
        if (!result) throw new Error('Not found id');
        return result as User;
    }

    async post(data: Partial<User>): Promise<User> {
        if (typeof data.passwd !== 'string') throw new Error('');
        data.passwd = await passwdEncrypt(data.passwd);
        const result = await this.#Model.create(data);
        return result as User;
    }

    async find(search: any): Promise<User> {
        console.log(search);
        const result = await this.#Model.findOne(search);
        if (!result) throw new Error('Not found id');
        return result as unknown as User;
    }
}
