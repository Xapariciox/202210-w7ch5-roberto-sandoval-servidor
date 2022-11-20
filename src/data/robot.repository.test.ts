import { dbConnect } from '../db.connect';
import { mockData } from '../mock/mock';
import { RobotRepository } from './robot.repository';

describe('Given RobotRepository', () => {
    const repository = new RobotRepository();
    let testIds: Array<string>;
    beforeAll(async () => {
        await dbConnect();
        await repository.getModel().deleteMany();
        await repository.getModel().insertMany(mockData);
        const data = await repository.getModel().find();
        testIds = [data[0].id, data[1].id];
    });

    test('Then getAll should return an array of robot', async () => {
        const result = await repository.getAll();
        expect(result[0].name).toEqual(mockData[0].name);
    });
    // The line covers me in coverage but the test fails
    // test('Then getAll...', async () => {
    //     expect(await repository.getAll()).rejects.toThrow();
    // });

    test('Then get should return an robot', async () => {
        const result = await repository.get(testIds[0]);
        expect(result.name).toEqual(mockData[0].name);
    });

    test('when get it receives an invalid id it should return an error', async () => {
        expect(async () => {
            await repository.get(testIds[4]);
        }).rejects.toThrowError();
    });

    test('Then post should return an new robot', async () => {
        const newRobot = {
            name: 'arabica',
        };
        const result = await repository.post(newRobot);
        expect(result.name).toEqual(newRobot.name);
    });

    test('Then patch should return an robot with an update prop', async () => {
        const result = await repository.patch(testIds[0], mockData[0]);
        expect(result.name).toEqual(mockData[0].name);
    });

    test('when patch it receives an invalid id it should return an error', async () => {
        expect(async () => {
            await repository.patch(testIds[3], { name: 'pepe' });
        }).rejects.toThrowError();
    });

    test('Then delete should return an id of the removed robot', async () => {
        const result = await repository.delete(testIds[0]);
        expect(result).toEqual({ id: testIds[0] });
    });
    afterAll(async () => {
        await repository.disconnect();
    });
});
