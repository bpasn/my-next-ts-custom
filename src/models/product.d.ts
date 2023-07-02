interface IPayload {
    count:number,
    products: IProducts[]
}
interface IProducts {
    id:string;
    image:string;
    productName:string;
    categoryName:string;
    sku:string;
    price:string;
    quantity:string;
    active:string;
}