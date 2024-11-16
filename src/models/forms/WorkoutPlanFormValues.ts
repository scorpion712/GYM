import { Workout } from "../Workout";

export type WorkoutPlanFormValues = {
    id?: string;
    name: string;
    objective?: string;
    duration?: number;
    initDate: Date;
    endDate?: Date;
    workouts: Workout[];
    day: number;
    description: string;
    exerciseName: string;
    series: number;
    repetitions: number;
    weight: number;
    rir: number;
    rpe: number;
    comments: string;
    customersId?: string[];
}

