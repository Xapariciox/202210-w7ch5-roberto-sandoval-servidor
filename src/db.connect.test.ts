import { dbConnect } from './db.connect';
import mongoose from 'mongoose';

test('should firsts', async () => {
    const result = await dbConnect();
    expect(typeof result).toBe(typeof mongoose);
    mongoose.disconnect();
});
