import React, { useState } from 'react';
import { Button, Space, Tag, Tooltip } from 'antd';
import { BankOutlined, FolderOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useTransaction } from '../../../../../providers/TransactionProvider';
import { useTransactionDetails } from '../../providers/TransactionDetailsProvider';
import Show from '@/components/Show';

export default function TransactionMetadata() {
    const { setAccount, setCategory } = useTransaction();
    const { account, category, installmentsNumber, selectedMenu, setSelectedMenu } = useTransactionDetails();

    function handleSelectAccount(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setAccount(account);
    }

    function handleSelectCategory(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setCategory(category);
    }

    function handleSelectMenu(e: any, menu: string | null) {
        e.preventDefault();
        e.stopPropagation();
        setSelectedMenu(menu);
    }

    return (
        <Space>
            <Space>
                <Tooltip title="Conta">
                    <Tag bordered={false} onClick={(e) => handleSelectAccount(e)} icon={<BankOutlined />}>
                        {account?.name}
                    </Tag>
                </Tooltip>
                <Tooltip title="Categoria">
                    <Tag bordered={false} onClick={(e) => handleSelectCategory(e)} icon={<FolderOutlined />}>
                        {category?.name}
                    </Tag>
                </Tooltip>
                {installmentsNumber > 1 ? (
                    <Tooltip title="Lançamento parcelado">
                        <Space size="small">
                            <UnorderedListOutlined />
                            <span>Parcelado</span>
                        </Space>
                    </Tooltip>
                ) : null}
                <Show when={installmentsNumber > 1}>
                    <Tag.CheckableTag
                        checked={selectedMenu === 'installments'}
                        onChange={(checked) => setSelectedMenu(checked ? 'installments' : null)}>
                        Mostrar parcelas
                    </Tag.CheckableTag>
                </Show>
            </Space>
        </Space>
    );
}
