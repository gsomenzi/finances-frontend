'use client';

import { useAuth } from '@/providers/AuthProvider';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
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
            <Flex style={{ height: '100vh', width: '100vw' }} justify="center" align="center" vertical>
                <div>
                    <Spin indicator={<LoadingOutlined spin />} size="large" />
                </div>
            </Flex>
        </main>
    );
}
