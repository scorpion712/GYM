import { GetUserResponse, UserCustomer } from "../../models";

export const adaptGetCustomerToCustomer = (user: GetUserResponse) => {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        age: user.age,
        dni: user.idNumber,
        daysPerWeek: user.daysPerWeek,
        lastPaidDate: user.lastPaidDate,
        considerations: user.considerations
    } as UserCustomer;
}