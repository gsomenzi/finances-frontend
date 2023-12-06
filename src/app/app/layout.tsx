'use client';

import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
const Content = Layout.Content;

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { authenticated } = useAuth();
    useEffect(() => {
        if (!authenticated) {
            router.push('/auth/login');
        }
    }, [authenticated]);
    return (
        <>
            <Layout>
                <Content>{children}</Content>
            </Layout>
        </>
    );
}
