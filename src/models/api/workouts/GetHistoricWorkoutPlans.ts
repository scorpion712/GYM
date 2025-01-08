export type GetHistoricWorkoutPlansResponse = {
    workouts: WorkoutHistory[];
    total: number;
}

type WorkoutHistory =  {
    id: string;
    name: string;
    userName: string;
    objective: string;
    duration: number;
    initDate: Date;
    endDate: Date; 
}