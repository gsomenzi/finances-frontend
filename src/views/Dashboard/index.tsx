import { Button } from '@mui/material';
import { useAuth } from 'providers/AuthProvider';
import React from 'react';

export default function DashboardView() {
    const { signOut } = useAuth();

    function handleSignOut() {
        signOut();
    }

    return (
        <div>
            <Button variant="contained" onClick={handleSignOut}>
                Sign out
            </Button>
        </div>
    );
}
