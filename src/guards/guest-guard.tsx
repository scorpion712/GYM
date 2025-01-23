import { ReactNode, useCallback, useEffect, useState } from 'react';

import { useAuth } from '../hooks/useAuth';
import { useRouter } from '../hooks';
import { paths } from '../routes/paths';
 
export const GuestGuard = (props: { children: ReactNode | ReactNode []; }) => {
  const { children } = props;
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (isAuthenticated) {
      router.replace(paths.index, {});
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, router]);

  // Only check on mount, this allows us to redirect the user manually when auth state changes
  useEffect(
    () => {
      if (loading) return;
      check();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, isAuthenticated]
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // not authenticated / authorized.

  return <>{children}</>;
};
