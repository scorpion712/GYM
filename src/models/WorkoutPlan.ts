import { Workout } from "./Workout";

export type WorkoutPlan = {
    id: string;
    name: string;
    objective?: string;
    duration?: number;
    initDate: Date;
    endDate?: Date;
    assignedUsers: string[];
    workouts: Workout[]; 
}