import { ReactNode, useCallback, useEffect, useState } from 'react';

import { useAuth, useRouter } from '../hooks';
import { paths } from '../routes/paths';
import { UserRoles } from '../models';

interface RoleGuardProps {
    allowedRoles: UserRoles[];
    children: ReactNode;
}

export const RoleGuard = ({ allowedRoles, children }: RoleGuardProps) => {
    const { user, loading, getUserRole } = useAuth();
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    const check = useCallback(async () => { 
        const userRole = await getUserRole();
        if (!userRole) {
            router.replace(paths.notAuthorized);
            return;
        }
        const isUserRoleAuthorized = allowedRoles.some(role => role.toLowerCase() == userRole.toString().toLowerCase());  
        
        if (!isUserRoleAuthorized) {
            router.replace(paths.notAuthorized);
            return;
        }

        setChecked(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, router]);

    // Only check on mount, this allows us to redirect the user manually when auth state changes
    useEffect(
        () => {
            if (loading) return;
            check();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [user, loading]
    );

    if (!checked || loading) {
        return null;
    }

    // If got here, it means that the redirect did not occur, and that tells us that the user is
    // authorized to visit the page.
    return <>{children}</>;
}

