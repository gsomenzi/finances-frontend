'use client';

import React, { useEffect } from 'react';
import { AccountsViewProps } from './types';
import { Table } from 'antd';
import { currencyFormatter } from '@/lib/currencyFormatter';
import { accountTypeTranslator } from '@/lib/accountTypeTranslator';

export default function AccountsView(props: AccountsViewProps) {
    const { accounts, balances, isLoading } = props;

    return (
        <div>
            <span>AccountsView</span>
            <Table
                dataSource={accounts}
                loading={isLoading}
                rowKey={(row) => row.id}
                columns={[
                    {
                        title: 'Nome',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: 'Tipo',
                        dataIndex: 'type',
                        key: 'type',
                        render: (type: string) => accountTypeTranslator(type),
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
                ]}
            />
        </div>
    );
}
