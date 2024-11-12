import { Workout } from "./Workout";

export type WorkoutPlan = {
    id: string;
    name: string;
    objective?: string;
    duration?: number;
    initDate: Date;
    endDate?: Date;
    assignedUsers: Customer[];
    workouts: Workout[]; 
}

type Customer = {
    id: string;
    name: string;
}