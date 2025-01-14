export const paths = {
  index: '/',
  auth: {
    login: '/auth/login',
    resetPwd: '/auth/reset',
  },
  users: {
    create: '/user/create',
    edit: '/user/edit',
    workout: '/user/workout',
    workoutHistory: '/user/workout/history',
    workoutHistoryDetail: '/user/workout/history/detail',
  },
  workout: {
    index: '/workout',
    create: '/workout/create',
    edit: '/workout/edit',
  },
  membership: {
    index: '/membership',
  },
  notAuthorized: '/401',
  notFound: '/404',
};
