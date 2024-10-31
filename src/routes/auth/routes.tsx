import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from '../../guards';
import { paths } from '../paths';
import { Layout as AuthLayout } from '../../components/layouts/auth';

const LoginPage = lazy(() => import('../../pages/auth/login/index'));
const SetPasswordPage = lazy(() => import('../../pages/auth/setPassword/index'));

export const authRoutes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        element: (
          <GuestGuard>
            <AuthLayout>
              <Outlet />
            </AuthLayout>
          </GuestGuard>
        ),
        children: [
          {
            path: paths.auth.login,
            element: <LoginPage />,
          }, 
          {
            path: paths.auth.resetPwd,
            element: <SetPasswordPage />,
          }
        ],
      },
    ],
  },
];
