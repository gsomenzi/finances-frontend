import React, { ReactNode, useMemo } from 'react';
import { TransactionsListItemProps } from './types';
import { List, Space, Tag, Tooltip, Typography } from 'antd';
import { useTransaction } from '../../providers/TransactionProvider';
import { Account } from '@/types/Account';
import { ArrowDownOutlined, ArrowUpOutlined, BankOutlined, FolderOutlined } from '@ant-design/icons';
import { Category } from '@/types/Category';

export default function TransactionsListItem(props: TransactionsListItemProps) {
    const { setAccount, setCategory, setSelectedTransaction } = useTransaction();
    const { item } = props;
    function handleSelectAccount(e: any, account: Pick<Account, 'id' | 'name'> | null) {
        e.preventDefault();
        e.stopPropagation();
        setAccount(account);
    }

    function handleSelectCategory(e: any, category: Pick<Category, 'id' | 'name'> | null) {
        e.preventDefault();
        e.stopPropagation();
        setCategory(category);
    }

    function getTransactionTypeIcon(type: string): ReactNode {
        switch (type) {
            case 'income':
                return (
                    <Tooltip title="Receita">
                        <ArrowUpOutlined style={{ color: 'green' }} />
                    </Tooltip>
                );
            case 'expense':
                return (
                    <Tooltip title="Despesa">
                        <ArrowDownOutlined style={{ color: 'red' }} />
                    </Tooltip>
                );
            default:
                return null;
        }
    }

    const account: Pick<Account, 'id' | 'name'> | null = useMemo(() => {
        if (item?.relatedAccounts?.length <= 0) {
            return null;
        }
        return item.relatedAccounts[0].account;
    }, [item]);

    const category: Pick<Category, 'id' | 'name'> | null = useMemo(() => {
        if (!item?.category) {
            return null;
        }
        return item.category;
    }, [item]);

    const type = item?.relatedAccounts?.[0]?.relation;

    return (
        <List.Item
            style={{ cursor: 'pointer' }}
            onClick={() =>
                setSelectedTransaction({
                    transaction: item,
                    action: 'details',
                })
            }>
            <List.Item.Meta
                title={item.description}
                description={
                    <Space size="middle">
                        <Tooltip title="Conta">
                            <Space size="small" onClick={(e) => handleSelectAccount(e, account)}>
                                <BankOutlined />
                                <span>{account?.name}</span>
                            </Space>
                        </Tooltip>
                        <Tooltip title="Categoria">
                            <Space size="small" onClick={(e) => handleSelectCategory(e, category)}>
                                <FolderOutlined />
                                <span>{category?.name}</span>
                            </Space>
                        </Tooltip>
                    </Space>
                }
            />
            <Space size="middle">
                {item.tags && item.tags.length > 0 ? (
                    <Tooltip title="Tags">
                        <Space size="small">
                            {item.tags.map((tag) => (
                                <Tag bordered={false} key={tag.id}>
                                    {tag.name}
                                </Tag>
                            ))}
                        </Space>
                    </Tooltip>
                ) : null}
                <Space size="small">
                    <Tooltip title="Valor">
                        <Typography>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(Number(item.value))}
                        </Typography>
                    </Tooltip>
                    {getTransactionTypeIcon(type)}
                </Space>
            </Space>
        </List.Item>
    );
}
