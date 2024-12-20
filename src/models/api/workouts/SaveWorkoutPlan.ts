export type SaveWorkoutPlanRequest = {
    name: string;
    objective?: string;
    duration?: number;
    initDate: Date;
    endDate?: Date;
    workouts: Workout[]; 
    customersId?: string[];
}

export type SaveWorkoutPlanResponse = {
    id: string;
}

type Workout = {
    id: string;
    week: number;
    day: number;
    description: string;
    exercises: Exercise[];
}

type Exercise = {
    id: string;
    name: string;
    series: number;
    repetitions: number;
    weight: number;
    rir: number;
    rpe: number;
    comments: string;
}