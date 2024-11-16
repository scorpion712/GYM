import { GetAllUsersResponse, UserCustomer } from "../../models";

export const adaptGetAllCustomersToCustomers = (allUsers: GetAllUsersResponse) => {
    return allUsers.users.map(user => {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            age: user.age,
            daysPerWeek: user.daysPerWeek,
            lastPaidDate: user.lastPaidDate, 
        } as UserCustomer
    });
}