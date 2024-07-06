export type NewProductDTO = {
    name: string;
    options: string;
    price: number;
    timeToPrepare: number;
    category:string;
    status: boolean;
}

export type ProductDTO = {
    id: string;
    name: string;
    options: string;
    price: number;
    timeToPrepare: number;
    category:string;
    status: boolean;
}