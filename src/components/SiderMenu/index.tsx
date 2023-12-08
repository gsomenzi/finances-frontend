import React from 'react';
import { Menu } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { BankOutlined, CreditCardOutlined, HomeOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Wrapper } from './styles';
import { useRouter } from 'next/navigation';

export default function SiderMenu() {
    const router = useRouter();
    const items: ItemType<MenuItemType>[] = [
        {
            key: '1',
            icon: <HomeOutlined />,
            label: 'Dashboard',
        },
        {
            key: '2',
            icon: <UnorderedListOutlined />,
            label: 'Transações',
        },
        {
            key: '3',
            icon: <BankOutlined />,
            label: 'Contas',
        },
        {
            key: '4',
            icon: <CreditCardOutlined />,
            label: 'Cartões de crédito',
        },
    ];

    function handleSelect(item: ItemType<MenuItemType>) {
        switch (item?.key) {
            case '1': {
                return router.push('/app/dashboard');
            }
            case '2': {
                return router.push('/app/transactions');
            }
            case '3': {
                return router.push('/app/accounts');
            }
            case '4': {
                return router.push('/app/credit-cards');
            }
        }
    }
    return (
        <Wrapper>
            <Menu theme="dark" mode="inline" multiple={false} defaultSelectedKeys={['1']} items={items} onSelect={handleSelect} />
        </Wrapper>
    );
}
