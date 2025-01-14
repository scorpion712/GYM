import axios from "axios";

import { APIConfig } from "../../config";
import { AxiosCall, GetMembershipsResponse, RegisterUserPaymentRequest, RegisterUserPaymentResponse } from "../../models";

const pay = async (request: RegisterUserPaymentRequest) => {
    const controller = new AbortController();

    return {
        call: axios.post(`${APIConfig.baseURL}/Membership`, request, { signal: controller.signal }),
        controller
    } as AxiosCall<RegisterUserPaymentResponse>;
}

const getAll = async (/*request: GetMembershipsRequest*/) => {  
    const controller = new AbortController();

    return {
        // TO DO: request to url querystring
        call: axios.get(`${APIConfig.baseURL}/Membership`, { signal: controller.signal }),
        controller
    } as AxiosCall<GetMembershipsResponse>;
}

export const membershipService = {
    pay,
    getAll
}