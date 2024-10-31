export type UserRegistrationFormValues = {
    firstName: string;
    lastName?: string; 
    age?: number;
    phone?: string;
    email?: string;
    considerations?: string;
    daysPerWeek: boolean [];
}