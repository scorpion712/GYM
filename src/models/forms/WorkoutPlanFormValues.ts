export type WorkoutPlanFormValues = {
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

export type Workout = {
    id: string;
    week: number;
    day: number;
    description: string;
    exercise: Exercise[];
}

export type Exercise = {
    id: string;
    name: string;
    series: number;
    repetitions: number;
    weight: number;
    rir: number;
    rpe: number;
    comments: string;
}