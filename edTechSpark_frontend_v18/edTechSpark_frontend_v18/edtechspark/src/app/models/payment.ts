export class Payment {
    paymentId: string | any;
    signature: string | undefined;
    orderId: string | undefined;
    tax: number | undefined;
    currency: string | undefined;
    total: number | undefined;
    email: string | undefined;
    cartId: string | undefined;
    items: [] | undefined;
    userId: number | undefined;
    grandTotal: number | undefined;
}