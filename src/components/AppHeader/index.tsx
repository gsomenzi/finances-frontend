import React, { useMemo } from 'react';
import { Wrapper } from './styles';
import { Avatar, Breadcrumb, BreadcrumbProps, Dropdown, Flex, MenuProps, Space } from 'antd';
import { DownOutlined, HomeOutlined, SmileOutlined } from '@ant-design/icons';
import { useConfirm } from '@/providers/ConfirmProvider';
import { useAuth } from '@/providers/AuthProvider';
import { usePathname } from 'next/navigation';

export default function AppHeader() {
    const { confirm } = useConfirm();
    const { logout } = useAuth();
    const pathname = usePathname();
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Perfil
                </a>
            ),
        },
        {
            key: '4',
            danger: true,
            label: 'Logout',
            onClick: () => {
                confirm({
                    title: 'Logout',
                    description: 'Tem certeza que deseja sair?',
                    onConfirm: () => {
                        logout();
                    },
                    onCancel: () => {},
                });
            },
        },
    ];
    const breadCrumbItems: BreadcrumbProps['items'] = useMemo(() => {
        const path = pathname.split('/').filter((p) => !['app', '', 'dashboard'].includes(p));
        const items: BreadcrumbProps['items'] = [
            {
                href: '/app/dashboard',
                title: 'Home',
            },
        ];
        path.forEach((p) => {
            items.push({
                href: `/app/${p}` !== pathname ? `/app/${p}` : undefined,
                title: getTranslatedBreadcrumTitle(p),
            });
        });
        return items;
    }, [pathname]);

    function getTranslatedBreadcrumTitle(title: string) {
        switch (title) {
            case 'dashboard':
                return 'Home';
            case 'transactions':
                return 'Transações';
            case 'accounts':
                return 'Contas';
            case 'credit-cards':
                return 'Cartões de crédito';
            default:
                return title;
        }
    }
    return (
        <Wrapper>
            <Flex justify="space-between" align="center">
                <div>
                    <Breadcrumb items={breadCrumbItems} />
                </div>
                <Dropdown menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Avatar>U</Avatar>
                    </a>
                </Dropdown>
            </Flex>
        </Wrapper>
    );
}
