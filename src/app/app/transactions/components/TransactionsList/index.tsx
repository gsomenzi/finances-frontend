'use client';

import React, { ReactNode } from 'react';
import { Wrapper } from './styles';
import { TransactionsListProps } from './types';
import { List, Space, Tag, Tooltip, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, BankOutlined, FolderOutlined } from '@ant-design/icons';
import { Account } from '@/types/Account';
import { Category } from '@/types/Category';

export default function TransactionsList(props: TransactionsListProps) {
    const { transactions, loading, onSelect, onSelectAccount, onSelectCategory } = props;

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

    function handleSelectAccount(e: any, account: Pick<Account, 'id' | 'name'>) {
        e.preventDefault();
        e.stopPropagation();
        if (onSelectAccount) {
            onSelectAccount(account);
        }
    }

    function handleSelectCategory(e: any, category: Pick<Category, 'id' | 'name'>) {
        e.preventDefault();
        e.stopPropagation();
        if (onSelectCategory) {
            onSelectCategory(category);
        }
    }

    return (
        <Wrapper>
            <List
                loading={loading}
                dataSource={transactions}
                renderItem={(item) => (
                    <List.Item style={{ cursor: 'pointer' }} onClick={() => onSelect(item)}>
                        <List.Item.Meta
                            title={item.description}
                            description={
                                <Space size="middle">
                                    <Tooltip title="Conta">
                                        <Space
                                            size="small"
                                            onClick={(e) => handleSelectAccount(e, item.relatedAccounts[0].account)}>
                                            <BankOutlined />
                                            <span>{item.relatedAccounts[0].account.name}</span>
                                        </Space>
                                    </Tooltip>
                                    <Tooltip title="Categoria">
                                        <Space size="small" onClick={(e) => handleSelectCategory(e, item.category)}>
                                            <FolderOutlined />
                                            <span>{item.category.name}</span>
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
                                {getTransactionTypeIcon(item.relatedAccounts[0].relation)}
                            </Space>
                        </Space>
                    </List.Item>
                )}
            />
        </Wrapper>
    );
}
