import { OrderItem } from "./orderItem";

export class Order {
    id: string | any;
    userId: number | undefined;
    paymentId: string | any;
    currency: string | any;
    total: number | undefined;
    tax: number | undefined;
    grandTotal: number | undefined;
    billingAddress: string | any;
    createdDate: string | any;
    items: OrderItem[] | any;
}