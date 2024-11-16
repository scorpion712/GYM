import { GetWorkoutPlansResponse, WorkoutPlan } from "../../models"

export const adaptGetWorkoutPlansToWorkoutPlan = (workoutPlans: GetWorkoutPlansResponse) => {
    return workoutPlans.workouts.map(workoutPlan => {
        return {
            id: workoutPlan.id,
            name: workoutPlan.name,
            objective: workoutPlan.objective,
            duration: workoutPlan.duration,
            initDate: workoutPlan.initDate,
            endDate: workoutPlan.endDate,
            assignedUsers: workoutPlan.assignedUsers
        } as WorkoutPlan
    })
}