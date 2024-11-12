export type EditWorkoutPlanRequest = {
    name: string;
    objective?: string;
    duration?: number;
    initDate: Date;
    endDate?: Date;
    workouts: Workout[]; 
    customersId?: string[];
}

export type EditWorkoutPlanResponse = {
    id: string;
}

type Workout = {
    id: string;
    week: number;
    day: number;
    description: string;
    exercise: Exercise[];
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