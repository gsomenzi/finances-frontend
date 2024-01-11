import React, { ReactNode, useMemo, useState } from 'react';
import { TransactionsListItemProps } from './types';
import { Button, List, Space, Tag, Tooltip, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, UnorderedListOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from 'react-query';
import CreditCardTransactionModel from '@/models/CreditCardTransactionModel';

const contextMenuVariants = {
    hidden: { opacity: 0, scale: 0, width: 0 },
    visible: { opacity: 1, scale: 1, width: 'auto' },
};

export default function TransactionsListItem(props: TransactionsListItemProps) {
    const { item } = props;
    const [showContext, setShowContext] = useState(false);
    const creditCardTransactionModel = new CreditCardTransactionModel();
    const queryClient = useQueryClient();

    function getTransactionTypeIcon(type: string | null): ReactNode {
        if (!type) {
            return null;
        }
        switch (type) {
            case 'income':
                return (
                    <Tooltip title="Pagamento">
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

    const { mutate: remove, isLoading: isRemoving } = useMutation(
        (id: number) => creditCardTransactionModel.delete(id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('statements');
            },
        },
    );

    return (
        <List.Item
            onMouseEnter={() => setShowContext(true)}
            onMouseLeave={() => setShowContext(false)}
            style={{ cursor: 'pointer' }}
            onClick={() => {}}>
            <List.Item.Meta
                description={
                    <Space direction="vertical">
                        <Space>
                            <Typography.Text strong>{item.description}</Typography.Text>
                            <Typography.Text type="secondary">{dayjs(item.date).format('DD/MM/YYYY')}</Typography.Text>
                        </Space>
                        <Space size="middle">
                            <Tooltip title="Número de parcelas">
                                <Space size="small">
                                    <UnorderedListOutlined />
                                    <span>{installmentsNumber}x</span>
                                </Space>
                            </Tooltip>
                        </Space>
                    </Space>
                }
            />
            <Space size="middle">
                {item.tags && item.tags.length > 0 ? (
                    <Space size="small">
                        {item.tags.map((tag) => (
                            <Tag bordered={false} key={tag.id}>
                                {tag.name}
                            </Tag>
                        ))}
                    </Space>
                ) : null}
                <Space size="small">
                    <Typography>
                        {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(Number(item.value))}
                    </Typography>
                    {getTransactionTypeIcon(item.type)}
                </Space>
                <motion.div
                    layout
                    variants={contextMenuVariants}
                    initial="hidden"
                    animate={showContext ? 'visible' : 'hidden'}
                    exit="hidden">
                    <Space>
                        <Tooltip title="Remover">
                            <Button onClick={() => remove(item.id)} danger type="text" icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Space>
                </motion.div>
            </Space>
        </List.Item>
    );
}
