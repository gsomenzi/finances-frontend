'use client';

import React, { useState } from 'react';
import { AccountsViewProps } from './types';
import { Button, Flex, FloatButton, Input, Popconfirm, Space, Table, Tooltip, Typography } from 'antd';
import { currencyFormatter } from '@/lib/currencyFormatter';
import { accountTypeTranslator } from '@/lib/accountTypeTranslator';
import { PlusOutlined, StarOutlined } from '@ant-design/icons';
import AddEditForm from './components/AddEditForm';
import { Account } from '@/types/Account';

const { Search } = Input;

export default function AccountsView(props: AccountsViewProps) {
    const {
        accounts,
        balances,
        isLoading,
        isRemoving,
        page,
        limit,
        total,
        remove,
        onPageChange,
        onSizeChange,
        onSearch,
    } = props;
    const [open, setOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

    return (
        <div>
            <Flex justify="space-between" align="center">
                <Typography.Title level={2}>Contas</Typography.Title>
                <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
            </Flex>
            <FloatButton
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                    setSelectedAccount(null);
                    setOpen(true);
                }}
            />
            <AddEditForm open={open} onClose={() => setOpen(false)} account={selectedAccount} />
            <Table
                dataSource={accounts}
                loading={isLoading}
                rowKey={(row) => row.id}
                columns={[
                    {
                        title: 'Nome',
                        dataIndex: 'name',
                        key: 'name',
                        render: (name: string, record) => (
                            <div>
                                {name}{' '}
                                {record.default ? (
                                    <Tooltip title="Conta padrão">
                                        <StarOutlined style={{ color: 'gold' }} />
                                    </Tooltip>
                                ) : null}
                            </div>
                        ),
                    },
                    {
                        title: 'Tipo',
                        dataIndex: 'type',
                        key: 'type',
                        render: (type: string) => accountTypeTranslator(type),
                        filters: [
                            {
                                text: 'Conta Corrente',
                                value: 'checkings',
                            },
                            {
                                text: 'Investimentos',
                                value: 'investment',
                            },
                            {
                                text: 'Outros',
                                value: 'other',
                            },
                        ],
                        onFilter: (value, record) => record.type === value,
                    },
                    {
                        title: 'Moeda',
                        dataIndex: 'currency',
                        key: 'currency',
                    },
                    {
                        title: 'Saldo',
                        render: (value, record) =>
                            `${currencyFormatter(balances.find((b) => b.accountId === record.id)?.balance ?? 0)}`,
                    },
                    {
                        title: 'Ações',
                        align: 'right',
                        width: 1,
                        render: (value, record) => (
                            <Space>
                                <Button
                                    type="text"
                                    onClick={() => {
                                        setSelectedAccount(record);
                                        setOpen(true);
                                    }}>
                                    Editar
                                </Button>
                                <Popconfirm
                                    title="Você tem certeza?"
                                    description="Você tem certeza que deseja remover esta conta?"
                                    onConfirm={() => remove(record.id)}
                                    okButtonProps={{ loading: isRemoving }}>
                                    <Button type="text" danger>
                                        Remover
                                    </Button>
                                </Popconfirm>
                            </Space>
                        ),
                    },
                ]}
                pagination={{
                    defaultCurrent: page,
                    defaultPageSize: limit,
                    total: total,
                    onChange: onPageChange,
                    showSizeChanger: true,
                    onShowSizeChange: (_, newSize) => onSizeChange(newSize),
                }}
            />
        </div>
    );
}
