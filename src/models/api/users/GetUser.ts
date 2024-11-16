export type GetuserResponse = {
    id: string;
    firstName: string;
    lastName?: string;
    phone?: string;
    email?: string;
    age?: string;
    daysPerWeek: boolean [];
    lastPaidDate?: number;
    considerations?: string;
};