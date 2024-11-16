import axios from "axios";

import { APIConfig } from "../../config";
import { AxiosCall, SaveWorkoutPlanRequest, SaveWorkoutPlanResponse } from "../../models";


const saveWorkoutPlan = async (request: SaveWorkoutPlanRequest) => {
    const controller = new AbortController();

    return {
        call: axios.post(`${APIConfig.baseURL}/WorkoutPlan`, request, { signal: controller.signal }),
        controller
    } as AxiosCall<SaveWorkoutPlanResponse>;
}

export const workoutService = {
    saveWorkoutPlan
}