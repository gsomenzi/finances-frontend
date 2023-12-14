'use client';

import AppLoader from '@/components/AppLoader';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
    const router = useRouter();
    const { authenticated } = useAuth();
    useEffect(() => {
        if (router) {
            if (authenticated === true) {
                router.push('/app/dashboard');
            } else {
                router.push('/auth/login');
            }
        }
    }, [authenticated, router]);
    return (
        <main>
            <AppLoader />
        </main>
    );
}
