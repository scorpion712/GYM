import axios from "axios";

import { APIConfig } from "../../config";
import { AxiosCall, GetUserWorkoutResponse, GetWorkoutPlansResponse, SaveWorkoutPlanRequest, SaveWorkoutPlanResponse } from "../../models";


const saveWorkoutPlan = async (request: SaveWorkoutPlanRequest) => {
    const controller = new AbortController();

    return {
        call: axios.post(`${APIConfig.baseURL}/WorkoutPlan`, request, { signal: controller.signal }),
        controller
    } as AxiosCall<SaveWorkoutPlanResponse>;
}

const getUserWorkout = async (id: string) => {
    const controller = new AbortController();

    return {
        call: axios.get(`${APIConfig.baseURL}/WorkoutPlan/${id}`, { signal: controller.signal }),
        controller
    } as AxiosCall<GetUserWorkoutResponse>;
}

const getAll = async () => {
    const controller = new AbortController();

    return {
        call: axios.get(`${APIConfig.baseURL}/WorkoutPlan`, { signal: controller.signal }),
        controller
    } as AxiosCall<GetWorkoutPlansResponse>;
}

export const workoutService = {
    saveWorkoutPlan,
    getUserWorkout,
    getAll
}