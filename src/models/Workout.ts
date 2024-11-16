import { Exercise } from "./Exercise";

export type Workout = {
    id: string;
    week: number;
    day: number;
    description: string;
    exercise: Exercise[];
}