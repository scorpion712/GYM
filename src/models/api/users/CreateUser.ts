export type CreateUserRequest = {
    firstName: string;
    lastName?: string;
    username: string;
    age?: number;
    phone?: string;
    email?: string;
    considerations?: string;
    daysPerWeek: number;
}

export type CreateUserResponse = {
    id: string;
}