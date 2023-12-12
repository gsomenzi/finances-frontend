'use client';

import React, { useEffect } from 'react';
import { AccountsViewProps } from './types';
import { Table } from 'antd';

export default function AccountsView(props: AccountsViewProps) {
    const { accounts, balances, isLoading, getTranslatedType } = props;

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
                        render: (type: string) => getTranslatedType(type),
                    },
                    {
                        title: 'Moeda',
                        dataIndex: 'currency',
                        key: 'currency',
                    },
                    {
                        title: 'Saldo',
                        render: (value, record) => `${balances.find((b) => b.accountId === record.id)?.balance ?? 0}`,
                    },
                ]}
            />
        </div>
    );
}
