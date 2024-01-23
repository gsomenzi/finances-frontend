import React from 'react';
import { Space, Tooltip } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import { useTransactionGroupDetails } from '../../providers/TransactionGroupDetailsProvider';

export default function TransactionGroupMetadata() {
    const {
        transactionGroup: { transactionsCount },
    } = useTransactionGroupDetails();

    return (
        <Space>
            <Space size="middle">
                <Tooltip title="Número de lançamentos">
                    <Space size="small">
                        <UnorderedListOutlined />
                        <span>{transactionsCount}</span>
                    </Space>
                </Tooltip>
            </Space>
        </Space>
    );
}
