import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { BankOutlined, CreditCardOutlined, HomeOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Wrapper } from './styles';
import { usePathname, useRouter } from 'next/navigation';

export default function SiderMenu() {
    const pathname = usePathname();
    const router = useRouter();
    const [selectedKeys, setSelectedKeys] = useState(['1']);
    const items: ItemType<MenuItemType>[] = [
        {
            key: '/app/dashboard',
            icon: <HomeOutlined />,
            label: 'Dashboard',
        },
        {
            key: '/app/transactions',
            icon: <UnorderedListOutlined />,
            label: 'Lanamentos',
        },
        {
            key: '/app/accounts',
            icon: <BankOutlined />,
            label: 'Contas',
        },
        {
            key: '/app/credit-cards',
            icon: <CreditCardOutlined />,
            label: 'Cartões de crédito',
        },
    ];

    function handleSelect(item: ItemType<MenuItemType>) {
        return router.push(String(item?.key) || '/app/dashboard');
    }

    useEffect(() => {
        if (pathname) {
            setSelectedKeys([pathname]);
        }
    }, [pathname]);

    return (
        <Wrapper>
            <Menu
                theme="dark"
                mode="inline"
                multiple={false}
                selectedKeys={selectedKeys}
                items={items}
                onSelect={handleSelect}
            />
        </Wrapper>
    );
}
