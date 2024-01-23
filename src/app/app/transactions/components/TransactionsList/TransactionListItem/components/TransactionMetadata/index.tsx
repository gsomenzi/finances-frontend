import React from 'react';
import { Space, Tooltip } from 'antd';
import { BankOutlined, FolderOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useTransaction } from '../../../../../providers/TransactionProvider';
import { useTransactionDetails } from '../../providers/TransactionDetailsProvider';

export default function TransactionMetadata() {
    const { setAccount, setCategory } = useTransaction();
    const { account, category, installmentsNumber } = useTransactionDetails();

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

    return (
        <Space>
            <Space size="middle">
                <Tooltip title="Conta">
                    <Space size="small" onClick={(e) => handleSelectAccount(e)}>
                        <BankOutlined />
                        <span>{account?.name}</span>
                    </Space>
                </Tooltip>
                <Tooltip title="Categoria">
                    <Space size="small" onClick={(e) => handleSelectCategory(e)}>
                        <FolderOutlined />
                        <span>{category?.name}</span>
                    </Space>
                </Tooltip>
                {installmentsNumber > 1 ? (
                    <Tooltip title="Lançamento parcelado">
                        <Space size="small">
                            <UnorderedListOutlined />
                            <span>Parcelado</span>
                        </Space>
                    </Tooltip>
                ) : null}
            </Space>
        </Space>
    );
}
