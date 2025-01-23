export type GetMembershipsRequest = {
    userId: string;
}

export type GetMembershipsResponse = {
    memberships: Membership[];
    total: number;
}

type Membership = {
    id: string;
    userId: string;
    userName: string;
    date: Date;
    total: number;
    daysPerWeek: number;
}