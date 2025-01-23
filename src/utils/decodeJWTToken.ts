import { jwtDecode } from 'jwt-decode';

// Define the expected payload type
interface JwtPayload {
    sub: string;
    exp: number;
    role: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export const decodeJwtToken = (token: string): JwtPayload | null => {
    try {
        const decoded = jwtDecode<JwtPayload>(token); // Decode the token
        return decoded;
    } catch (error) {
        console.error('Error decoding the token:', error);
        return null;
    }
}