import { GetHistoricWorkoutPlansResponse, WorkoutHistory } from "../../models"

export const adaptGetUserWorkoutHistoryToWorkoutHistory = (workoutHistory: GetHistoricWorkoutPlansResponse) => {
    return workoutHistory.workouts.map(workout => {
        return {
            id: workout.id,
            userName: workout.userName,
            name: workout.name,
            objective: workout.objective,
            duration: workout.duration,
            initDate: new Date(workout.initDate),
            endDate: workout.endDate ? new Date(workout.endDate) : null,
        } as WorkoutHistory
    })
}