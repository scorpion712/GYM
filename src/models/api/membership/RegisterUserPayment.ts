export type RegisterUserPaymentRequest = {
    userId: string;
    date: Date;
    total: number;
    daysPerWeek: boolean [];
}

export type RegisterUserPaymentResponse = {
    id: string;
}