import React from 'react';
import { Wrapper } from './styles';
import { Avatar, Dropdown, Flex, MenuProps, Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { useConfirm } from '@/providers/ConfirmProvider';
import { useAuth } from '@/providers/AuthProvider';

export default function AppHeader() {
    const { confirm } = useConfirm();
    const { logout } = useAuth();
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
    return (
        <Wrapper>
            <Flex justify="space-between" align="middle">
                <div></div>
                <Dropdown menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Avatar>U</Avatar>
                    </a>
                </Dropdown>
            </Flex>
        </Wrapper>
    );
}
