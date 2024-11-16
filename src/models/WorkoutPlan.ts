
export type WorkoutPlan = {
    id: string;
    name: string;
    objective?: string;
    duration?: number;
    initDate: number;
    endDate?: number;
    assignedUsers: number;
}