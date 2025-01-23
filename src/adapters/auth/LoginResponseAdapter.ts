
import { AuthUser, LoginResponse } from "../../models";
import { decodeJwtToken } from "../../utils";

export const adaptLoginReponseToAuthUser = (response: LoginResponse) => {
    const decodedToken = decodeJwtToken(response.accessToken);
    return {
        id: decodedToken?.userId,
        email: decodedToken?.userEmail,
        name: response.name,
        lastName: response.lastName,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        role: decodedToken?.userRole
    } as AuthUser;
}