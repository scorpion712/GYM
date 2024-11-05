import { SaveWorkoutPlanRequest, WorkoutPlanFormValues } from "../../models";

export const adaptWorkoutPlanToSaveWorkoutPlanRequest = (workoutPlan: WorkoutPlanFormValues) => {
    return {
        name: workoutPlan.name,
        objective: workoutPlan.objective,
        duration: workoutPlan.duration,
        initDate: workoutPlan.initDate,
        endDate: workoutPlan.endDate,
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
                    }
                })
            }
        }),
        customersId: workoutPlan.customersId
    } as SaveWorkoutPlanRequest;
}