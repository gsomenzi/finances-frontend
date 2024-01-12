import React from 'react';
import { TransactionListItemDescriptionProps } from './types';
import { Space, Tooltip } from 'antd';
import { BankOutlined, FolderOutlined, GroupOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useTransaction } from '../../../../providers/TransactionProvider';
import { useTransactionDetails } from '../../providers/TransactionDetailsProvider';

export default function TransactionListItemDescription(props: TransactionListItemDescriptionProps) {
    const { setAccount, setCategory } = useTransaction();
    const { account, category, isGrouped, installmentsNumber } = useTransactionDetails();
    const { handleShowGroupItems } = props;

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
                {!isGrouped && (
                    <Tooltip title="Categoria">
                        <Space size="small" onClick={(e) => handleSelectCategory(e)}>
                            <FolderOutlined />
                            <span>{category?.name}</span>
                        </Space>
                    </Tooltip>
                )}
                {isGrouped ? (
                    <a href="/" onClick={handleShowGroupItems}>
                        <Space size="small">
                            <GroupOutlined />
                            <span>Mostrar agrupados</span>
                        </Space>
                    </a>
                ) : null}
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
