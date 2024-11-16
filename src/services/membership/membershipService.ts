import axios from "axios";

import { APIConfig } from "../../config";
import { AxiosCall, RegisterUserPaymentRequest, RegisterUserPaymentResponse } from "../../models";

const pay = async (request: RegisterUserPaymentRequest) => {
    const controller = new AbortController();

    return {
        call: axios.post(`${APIConfig.baseURL}/Membership/Pay`, request, { signal: controller.signal }),
        controller
    } as AxiosCall<RegisterUserPaymentResponse>;
}

export const membershipService = {
    pay
}