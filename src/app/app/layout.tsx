'use client';

import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import Sider from 'antd/es/layout/Sider';
import { Header } from 'antd/es/layout/layout';
import SiderMenu from '@/components/SiderMenu';
import AppHeader from '@/components/AppHeader';
const Content = Layout.Content;

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { authenticated } = useAuth();
    useEffect(() => {
        if (authenticated === false) {
            router.push('/auth/login');
        }
    }, [authenticated]);

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible>
                    <SiderMenu />
                </Sider>
                <Layout>
                    <Header style={{ paddingLeft: 24, paddingRight: 24, backgroundColor: '#fff' }}>
                        <AppHeader />
                    </Header>
                    <Content style={{ paddingLeft: 24, paddingRight: 24 }}>{children}</Content>
                </Layout>
            </Layout>
        </>
    );
}
