import React from 'react';
import { Card, Space, Tag, Typography } from 'antd';
import { useTransactionDetails } from '../../providers/TransactionDetailsProvider';
import Show from '@/components/Show';

export default function TransactionTagsPanel() {
    const { transaction, selectedMenu } = useTransactionDetails();

    const tags = transaction.tags;
    return (
        <Show when={selectedMenu === 'tags'}>
            <div style={{ padding: '24px 0px' }}>
                <Typography.Title level={5} style={{ marginTop: 0 }}>
                    Tags
                </Typography.Title>
                <Space size="small">
                    {tags.map((tag) => (
                        <>
                            <Tag key={tag.id}>{tag.name}</Tag>
                        </>
                    ))}
                </Space>
            </div>
        </Show>
    );
}
