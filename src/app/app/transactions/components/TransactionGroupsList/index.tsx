'use client';

import React from 'react';
import { TransactionGroupsListProps } from './types';
import { List } from 'antd';
import TransactionGroupDetailsProvider from './TransactionGroupListItem/providers/TransactionGroupDetailsProvider';
import TransactionGroupListItem from './TransactionGroupListItem';

export default function TransactionGroupsList(props: TransactionGroupsListProps) {
    const { groups, loading } = props;
    return (
        <List
            style={{ marginTop: '20px' }}
            header="Lançamentos agrupados"
            loading={loading}
            dataSource={groups}
            renderItem={(item) => (
                <TransactionGroupDetailsProvider transactionGroup={item}>
                    <TransactionGroupListItem />
                </TransactionGroupDetailsProvider>
            )}
        />
    );
}
