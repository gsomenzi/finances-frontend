'use client';

import React from 'react';
import { Layout } from 'antd';
import { WidthLimiter, Wrapper } from './styles';
import { AuthLayoutProps } from './types';
const Content = Layout.Content;

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <>
            <Layout>
                <Content>
                    <Wrapper>
                        <WidthLimiter>{children}</WidthLimiter>
                    </Wrapper>
                </Content>
            </Layout>
        </>
    );
}
