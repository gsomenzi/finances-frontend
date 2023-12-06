import React, { useEffect, useState } from 'react';
import { DashboardViewProps } from './types';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';

export default function DashboardViewModel(): DashboardViewProps {
    const { logout } = useAuth();
    const router = useRouter();

    function handleLogout() {
        logout();
        router.push('/auth/login');
    }

    return {
        handleLogout,
    };
}
