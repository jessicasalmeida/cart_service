import user from "./user";
import product from "./product";
import {ObjectId} from "mongodb";

export default interface cart {
    
    _id: ObjectId;
    user: user;
    products: Array<product>;
    totalValue: number;
    status: string;
    payment: boolean;
}
