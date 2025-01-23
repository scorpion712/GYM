export type WorkoutHistory = {
    id: string; 
    userName: string;
    name: string;
    objective?: string;
    duration?: number;
    initDate: Date;
    endDate?: Date;
}