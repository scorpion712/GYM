import { GetMembershipsResponse, Membership } from "../../models";

export const adaptGetMemberships = (memberships: GetMembershipsResponse) => {
    return memberships.memberships.map(membership => {
        return {
            id: membership.id,
            userId: membership.userId,
            userName: membership.userName,
            date: membership.date,
            total: membership.total,
            daysPerWeek: membership.daysPerWeek,
        } as Membership
    });
}