import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
export const USER = process.env.USER;
export const SECRET = process.env.SECRET;
export const PASSWORD = process.env.PASSWORD;
