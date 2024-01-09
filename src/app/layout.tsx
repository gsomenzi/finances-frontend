'use client';

import './globals.css';

import { ConfigProvider } from 'antd';
import { AuthProvider } from '@/providers/AuthProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ConfirmProvider } from '@/providers/ConfirmProvider';
import StyledComponentsRegistry from '@/providers/AntdRegistry';
import theme from '../theme/themeConfig';
import ptBR from 'antd/lib/locale/pt_BR';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { FeedbackProvider } from '@/providers/FeedbackProvider';

dayjs.locale('pt-br');

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();
    return (
        <html lang="pt-BR">
            <body>
                <StyledComponentsRegistry>
                    <ConfigProvider locale={ptBR} theme={theme}>
                        <ConfirmProvider>
                            <FeedbackProvider>
                                <AuthProvider>
                                    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
                                </AuthProvider>
                            </FeedbackProvider>
                        </ConfirmProvider>
                    </ConfigProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
