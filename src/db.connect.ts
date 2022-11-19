import mongoose from 'mongoose';
import { USER, PASSWORD } from './config.js';

export function dbConnect() {
    const DBName =
        process.env.NODE_ENV !== 'test' ? 'RobertoDocuments' : 'CodersTesting';
    const uri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.yswmjv0.mongodb.net/${DBName}?retryWrites=true&w=majority`;
    console.log({ DBName });
    console.log({ uri });
    return mongoose.connect(uri);
}
