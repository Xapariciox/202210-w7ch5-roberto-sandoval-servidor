import mongoose from 'mongoose';
import { USER, PASSWORD } from './config.js';

export function dbConnect() {
    const DBName =
        process.env.NODE_ENV !== 'test' ? 'RobertoDocumments' : 'CodersTesting';
    const uri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.lvrldiy.mongodb.net/${DBName}?retryWrites=true&w=majority`;
    return mongoose.connect(uri);
}
