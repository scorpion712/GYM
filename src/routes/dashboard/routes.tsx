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
                path: paths.workout.create,
                element: <CreateWorkoutPlanPage />,
            },
        ],
    },
];