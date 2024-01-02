import { ObjectId } from "mongodb";
import 'dotenv/config'
import mongoose from 'mongoose';

export interface cartItem{
    username: string,
    image: string,
    name: string,
    link: string,
    price: any,
}
export interface document extends cartItem{
    _id: ObjectId,
    time: string,
}
const userCartItem = new mongoose.Schema<document>({
    username: String,
    image: String,
    name: String,
    link: String,
    price: Number,
    _id: ObjectId,
    time: String,
});
const userCart = mongoose.model('usercart', userCartItem);
export interface Configuration {
    node_env: string,
    server: {
        port: number,
        mongoUrl: string,
    },
    feURL: string,
}
export const getConfiguration = (): Configuration => ({
    node_env: process.env.NODE_ENV || 'development',
    server: {
        port: Number(process.env.PORT) || 3000,
        mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017',
    },
    feURL: process.env.FE_URL || 'http://localhost:3000',
})

export const config = getConfiguration();
export default userCart;