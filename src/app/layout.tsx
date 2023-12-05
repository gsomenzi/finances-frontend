'use client';

import './globals.css';

import { ConfigProvider } from 'antd';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import { ApiProvider } from '@/hooks/useApi';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from '../theme/themeConfig';
import { AuthProvider } from '@/providers/AuthProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();
    return (
        <html lang="pt-BR">
            <body>
                <StyledComponentsRegistry>
                    <ConfigProvider theme={theme}>
                        <ApiProvider>
                            <AuthProvider>
                                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
                            </AuthProvider>
                        </ApiProvider>
                    </ConfigProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
