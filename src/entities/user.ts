import { model, Schema } from 'mongoose';
export type id = number | string;
export type UserI = {
    id: string;
    name: string;
    email: string;
    passwd: string;
    role: string;
};

export interface ExtraRepo<T> {
    getAll: () => Promise<Array<T>>;
    patch: (id: id, data: Partial<T>) => Promise<T>;
    delete: (id: id) => Promise<id>;
}

export interface Repo<T> extends BasicRepo<T> {
    getAll: () => Promise<Array<T>>;
    patch: (id: id, data: Partial<T>) => Promise<T>;
    delete: (id: id) => Promise<id>;
}
export interface BasicRepo<T> {
    get: (id: id) => Promise<T>;
    post: (data: Partial<T>) => Promise<T>;
    find: (data: any) => Promise<T>;
}
export type ProtoUser = {
    name?: string;
    email?: string;
    passwd?: string;
    role?: string;
};

export const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: String,
    passwd: String,
    role: String,
});
userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject._id;
        delete returnedObject.passwd;
    },
});
export const User = model<UserI>('User', userSchema, 'users');
