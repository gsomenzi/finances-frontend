'use client';

import React, { ReactNode } from 'react';
import { Wrapper } from './styles';
import { TransactionsListProps } from './types';
import { List, Space, Tag, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

export default function TransactionsList(props: TransactionsListProps) {
    const { transactions, loading } = props;

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

    return (
        <Wrapper>
            <List
                loading={loading}
                dataSource={transactions}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta title={item.description} description={dayjs(item.date).format('DD/MM/YYYY')} />
                        <Space>
                            <Tooltip title="Categoria">
                                <Tag>{item.category.name}</Tag>
                            </Tooltip>
                            <Tooltip title="Conta">
                                <Tag>{item.relatedAccounts[0].account.name}</Tag>
                            </Tooltip>
                            <Space>
                                <Tooltip title="Valor">
                                    {Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }).format(Number(item.value))}
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
