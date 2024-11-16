import { Exercise, GetWorkoutPlanResponse, Workout, WorkoutPlan } from "../../models"

export const adaptGetWorkoutPlanToWorkoutPlan = (workoutPlan: GetWorkoutPlanResponse) => {
    return {
        id: workoutPlan.id,
        name: workoutPlan.workoutPlanName,
        objective: workoutPlan.objective,
        duration: workoutPlan.duration,
        initDate: workoutPlan.initDate,
        endDate: workoutPlan.endDate,
        assignedUsers: workoutPlan.assignedUsers,
        workouts: workoutPlan.workouts.map(workout => {
            return {
                id: workout.id,
                week: workout.week,
                day: workout.day,
                description: workout.description,
                exercise: workout.exercise.map(exercise => {
                    return {
                        id: exercise.id,
                        name: exercise.name,
                        series: exercise.series,
                        repetitions: exercise.repetitions,
                        weight: exercise.weight,
                        rir: exercise.rir,
                        rpe: exercise.rpe,
                        comments: exercise.comments
                    } as Exercise
                })
            } as Workout
        })
    } as WorkoutPlan
}