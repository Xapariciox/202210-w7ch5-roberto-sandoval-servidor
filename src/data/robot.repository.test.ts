import mongoose from 'mongoose';
import { dbConnect } from '../db.connect';
import { RobotRepository } from './robot.repository';

const mockData = [
    {
        name: 'firstRobot',
        image: 'https://i.pinimg.com/originals/aa/39/eb/aa39ebef4541f235a9243c12c01a82ae.jpg',
        speed: 5,
        endurance: 5,
        date: '19.11.2022',
    },
    {
        name: 'firstRobot',
        image: 'https://i.pinimg.com/originals/aa/39/eb/aa39ebef4541f235a9243c12c01a82ae.jpg',
        speed: 5,
        endurance: 5,
        date: '19.11.2022',
    },
];
