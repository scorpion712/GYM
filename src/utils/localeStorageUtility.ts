export const USER_KEY = "gym-dashboard-user";

export const persistLocalStorage = (key: string, value: unknown) => { 
    localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorage = (key: string) => { 
    return localStorage.getItem(key);
}

export const cleanLocalStorage = () => {
    localStorage.clear();
}

export const clearLocalStorage = (key: string) => {
    localStorage.removeItem(key);
}