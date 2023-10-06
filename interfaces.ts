import { ObjectId } from "mongodb";
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