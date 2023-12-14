'use client';

import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { WidthLimiter, Wrapper } from './styles';
import { AuthLayoutProps } from './types';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import AppLoader from '@/components/AppLoader';
const Content = Layout.Content;

export default function AuthLayout({ children }: AuthLayoutProps) {
    const router = useRouter();
    const { authenticated } = useAuth();
    useEffect(() => {
        if (authenticated) {
            router.push('/app/dashboard');
        }
    }, [authenticated]);
    return (
        <>
            {authenticated === false ? (
                <Layout>
                    <Content>
                        <Wrapper>
                            <WidthLimiter>{children}</WidthLimiter>
                        </Wrapper>
                    </Content>
                </Layout>
            ) : (
                <AppLoader />
            )}
        </>
    );
}
