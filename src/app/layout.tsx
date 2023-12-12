'use client';

import './globals.css';

import { ConfigProvider } from 'antd';
import StyledComponentsRegistry from '@/providers/AntdRegistry';
import { ApiProvider } from '@/providers/ApiProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from '../theme/themeConfig';
import { AuthProvider } from '@/providers/AuthProvider';
import { ConfirmProvider } from '@/providers/ConfirmProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();
    return (
        <html lang="pt-BR">
            <body>
                <StyledComponentsRegistry>
                    <ConfigProvider theme={theme}>
                        <ConfirmProvider>
                            <ApiProvider>
                                <AuthProvider>
                                    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
                                </AuthProvider>
                            </ApiProvider>
                        </ConfirmProvider>
                    </ConfigProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
