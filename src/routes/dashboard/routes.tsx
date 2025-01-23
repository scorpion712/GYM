import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { AuthGuard, RoleGuard } from "../../guards";
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
const MembershipsPage = lazy(() => import('../../pages/memberships'));

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
                element:
                    <RoleGuard allowedRoles={['admin']}>
                        <HomePage />
                    </RoleGuard>,
            },
            {
                path: paths.users.create,
                element:
                    <RoleGuard allowedRoles={['admin']}>
                        <CreateUserPage />
                    </RoleGuard>,
            },
            {
                path: paths.users.edit,
                element:
                    <RoleGuard allowedRoles={['admin']}>
                        <EditUserPage />
                    </RoleGuard>,
            },
            {
                path: paths.workout.index,
                element:
                    <RoleGuard allowedRoles={['admin']}>
                        <WorkoutsPage />
                    </RoleGuard>,
            },
            {
                path: paths.workout.create,
                element:
                    <RoleGuard allowedRoles={['admin']}>
                        <CreateWorkoutPlanPage />
                    </RoleGuard>,
            },
            {
                path: paths.workout.edit,
                element:
                    <RoleGuard allowedRoles={['admin']}>
                        <EditWorkoutPlanPage />
                    </RoleGuard>,
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
                element:
                    <WorkoutPlanHistoryDetailPage />,
            },
            {
                path: paths.membership.index,
                element:
                    <RoleGuard allowedRoles={['admin']}>
                        <MembershipsPage />
                    </RoleGuard>,
            }
        ],
    },
];