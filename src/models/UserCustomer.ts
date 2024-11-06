export type UserCustomer = {
    id: string;
    firstName: string;
    lastName?: string;
    dni: string;
    phone?: string;
    email?: string;
    age?: string;
    daysPerWeek: boolean [];
    lastPaidDate?: number;
    considerations?: string;
};