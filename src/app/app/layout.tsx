'use client';

import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import Sider from 'antd/es/layout/Sider';
import { Header } from 'antd/es/layout/layout';
import SiderMenu from '@/components/SiderMenu';
import AppHeader from '@/components/AppHeader';
import AppLoader from '@/components/AppLoader';
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
            {authenticated === true ? (
                <Layout hasSider>
                    <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}>
                        <SiderMenu />
                    </Sider>
                    <Layout style={{ marginLeft: 200 }}>
                        <Header style={{ height: 64, paddingLeft: 24, paddingRight: 24, backgroundColor: '#fff' }}>
                            <AppHeader />
                        </Header>
                        <Content
                            style={{
                                height: 'calc(100vh - 64px)',
                                paddingLeft: 24,
                                paddingRight: 24,
                                paddingBottom: 24,
                                overflow: 'auto',
                            }}>
                            {children}
                        </Content>
                    </Layout>
                </Layout>
            ) : (
                <AppLoader />
            )}
        </>
    );
}
