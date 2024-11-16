import { Workout } from "./Workout";

export type WorkoutPlanDetail = {
    id: string;
    name: string;
    objective?: string;
    duration?: number;
    initDate: number;
    endDate?: number;
    assignedUsers: Customer[];
    workouts: Workout[]; 
}

type Customer = {
    id: string;
    name: string;
}