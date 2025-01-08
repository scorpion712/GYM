import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { AuthGuard } from "../../guards";
import { Layout as DashboardLayout } from '../../components/layouts/dashboard/index';
import { paths } from "../paths";

// eslint-disable-next-line react-refresh/only-export-components
const HomePage = lazy(() => import('../../pages/home'));
const CreateUserPage = lazy(() => import('../../pages/users/create'));
const EditUserPage = lazy(() => import('../../pages/users/edit'));
const CreateWorkoutPlanPage = lazy(() => import('../../pages/workoutplan/create'));
const UserWorkoutPlanPage = lazy(() => import('../../pages/users/workout'));
const UserWorkoutPlanHistoryPage = lazy(() => import('../../pages/users/workout/history'));
const WorkoutPlanHistoryDetailPage = lazy(() => import('../../pages/users/workout/history/detail/index'));
const WorkoutsPage = lazy(() => import('../../pages/workoutplan/workouts'));
const EditWorkoutPlanPage = lazy(() => import('../../pages/workoutplan/edit'));

export const dashboardRoutes = [
    {
        path: '',
        element: (
            <AuthGuard>
                <Suspense>
                    <DashboardLayout>
                        <Outlet />
                    </DashboardLayout>
                </Suspense>
            </AuthGuard>
        ),
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: paths.users.create,
                element: <CreateUserPage />,
            },
            {
                path: paths.users.edit,
                element: <EditUserPage />,
            },
            {
                path: paths.workout.index,
                element: <WorkoutsPage />,
            },
            {
                path: paths.workout.create,
                element: <CreateWorkoutPlanPage />,
            },
            {
                path: paths.workout.edit,
                element: <EditWorkoutPlanPage />,
            },
            {
                path: paths.users.workout,
                element: <UserWorkoutPlanPage />,
            },
            {
                path: paths.users.workoutHistory,
                element: <UserWorkoutPlanHistoryPage />,
            },
            {
                path: paths.users.workoutHistoryDetail,
                element: <WorkoutPlanHistoryDetailPage />,
            }
        ],
    },
];