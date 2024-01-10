import React, { ReactNode, useMemo } from 'react';
import { TransactionsListItemProps } from './types';
import { List, Space, Tooltip, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, UnorderedListOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

export default function TransactionsListItem(props: TransactionsListItemProps) {
    const { item } = props;

    function getTransactionTypeIcon(type: string | null): ReactNode {
        if (!type) {
            return null;
        }
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

    const installmentsNumber = useMemo(() => {
        const hasInstallments = item?.group?.type === 'installments';
        if (!hasInstallments) return 1;
        return item?.group?.transactions?.length || 1;
    }, [item]);

    return (
        <List.Item style={{ cursor: 'pointer' }} onClick={() => {}}>
            <List.Item.Meta
                description={
                    <Space direction="vertical">
                        <Space>
                            <Typography.Text strong>{item.description}</Typography.Text>
                            <Typography.Text type="secondary">{dayjs(item.date).format('DD/MM/YYYY')}</Typography.Text>
                        </Space>
                        <Space size="middle">
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
                }
            />
            <Space size="middle">
                {/* {item.tags && item.tags.length > 0 ? (
                    <Space size="small">
                        {item.tags.map((tag) => (
                            <Tag bordered={false} key={tag.id}>
                                {tag.name}
                            </Tag>
                        ))}
                    </Space>
                ) : null} */}
                <Space size="small">
                    <Typography>
                        {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(Number(item.value))}
                    </Typography>
                    {getTransactionTypeIcon(item.type)}
                </Space>
            </Space>
        </List.Item>
    );
}
