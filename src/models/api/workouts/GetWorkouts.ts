export type GetWorkoutPlansResponse = {
    workouts: WorkoutPlans[];
    total: number;
}

type WorkoutPlans = {
    id: string;
    name: string;
    objective: string;
    duration: number;
    initDate: number;
    endDate?: number;
    assignedUsers: number;
    workouts: Workout[];
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