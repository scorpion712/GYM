export type GetWorkoutPlanResponse = {
    id: string; 
    name: string;
    objective?: string;
    duration?: number;
    initDate: number;
    endDate?: number;
    workouts: Workout[]; 
    assignedUsers: Customer[];
}

type Customer = {
    id: string;
    name: string;
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