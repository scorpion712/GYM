import { Exercise, GetUserWorkoutResponse, UserWorkout, Workout } from "../../models"

export const adaptGetUserWorkoutToUserWorkout = (workout: GetUserWorkoutResponse) => {
    return {
        id: workout.id,
        userId: workout.userId,
        userName: workout.userName,
        userDaysPerWeek: workout.userDaysPerWeek,
        workoutPlanName: workout.workoutPlanName,
        objective: workout.objective,
        duration: workout.duration,
        initDate: new Date(workout.initDate),
        endDate: workout.endDate ? new Date(workout.endDate) : null,
        workouts: workout.workouts.map((workout: Workout) => {
            return {
                id: workout.id,
                week: workout.week,
                day: workout.day,
                description: workout.description,
                exercise: workout.exercise.map((exercise: Exercise) => {
                    return {
                        id: exercise.id,
                        name: exercise.name,
                        series: exercise.series,
                        repetitions: exercise.repetitions,
                        weight: exercise.weight,
                        rir: exercise.rir,
                        rpe: exercise.rpe,
                        comments: exercise.comments
                    }
                })
            }
        })
    } as UserWorkout
}