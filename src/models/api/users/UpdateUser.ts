export type UpdateUserRequest = {
    id: string;
    firstName: string;
    lastName?: string; 
    age?: number;
    phone?: string;
    email?: string;
    considerations?: string;
    daysPerWeek: boolean [];
}

export type UpdateUserResponse = {
    id: string;
}