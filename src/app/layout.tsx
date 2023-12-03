import StyledComponentsRegistry from '@/lib/AntdRegistry';
import './globals.css';

import theme from '../theme/themeConfig';
import { ConfigProvider } from 'antd';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <body>
                <StyledComponentsRegistry>
                    <ConfigProvider theme={theme}>{children}</ConfigProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
