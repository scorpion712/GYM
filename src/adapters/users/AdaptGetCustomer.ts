import { GetuserResponse, UserCustomer } from "../../models";

export const adaptGetCustomerToCustomer = (user: GetuserResponse) => {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        age: user.age,
        daysPerWeek: user.daysPerWeek,
        lastPaidDate: user.lastPaidDate,
        considerations: user.considerations
    } as UserCustomer;
}