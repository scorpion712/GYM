export type GetAllUsersResponse = {
    users: UserResponse [];
    total: number;
}

interface UserResponse {
    id: string;
    firstName: string;
    lastName?: string;
    phone?: string;
    email?: string;
    age?: string;
    daysPerWeek: boolean [];
    lastPaidDate?: number;
    considerations?: string;
    active: boolean;
}