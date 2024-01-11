'use client';

import React, { ReactNode, useMemo, useState } from 'react';
import { TransactionsListItemProps } from './types';
import { Button, List, Space, Tag, Tooltip, Typography } from 'antd';
import { useTransaction } from '../../providers/TransactionProvider';
import { Account } from '@/types/Account';
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    BankOutlined,
    CheckCircleOutlined,
    CheckCircleTwoTone,
    DeleteOutlined,
    FolderOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';
import { Category } from '@/types/Category';
import { useMutation, useQueryClient } from 'react-query';
import TransactionModel from '@/models/TransactionModel';
import { useFeedback } from '@/providers/FeedbackProvider';
import { motion } from 'framer-motion';

const contextMenuVariants = {
    hidden: { opacity: 0, scale: 0, width: 0 },
    visible: { opacity: 1, scale: 1, width: 'auto' },
};

export default function TransactionsListItem(props: TransactionsListItemProps) {
    const transactionModel = new TransactionModel();
    const queryClient = useQueryClient();
    const [showContext, setShowContext] = useState(false);
    const { showMessage, showNotification } = useFeedback();
    const { setAccount, setCategory, setSelectedTransaction } = useTransaction();
    const { item } = props;
    function handleSelectAccount(e: any, account: Pick<Account, 'id' | 'name'> | null) {
        e.preventDefault();
        e.stopPropagation();
        setAccount(account);
    }

    function handleSelectCategory(e: any, category: Pick<Category, 'id' | 'name'> | null) {
        e.preventDefault();
        e.stopPropagation();
        setCategory(category);
    }

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

    const payTransaction = useMutation(
        (transactionId: number) => {
            return transactionModel.togglePaid(transactionId);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('transactions');
                queryClient.invalidateQueries('balances');
                showMessage('success', 'Transação alterada com sucesso!');
            },
            onError: (e: any) => {
                console.log(e);
                showNotification('Erro', e?.response?.data?.message || 'Erro ao alterar a transação', {
                    type: 'error',
                });
            },
        },
    );

    function handlePayTransaction(e: any) {
        e.preventDefault();
        e.stopPropagation();
        payTransaction.mutate(item.id);
    }

    const { mutate: remove } = useMutation((id: number) => transactionModel.delete(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('transactions');
        },
    });

    const [account, category, type] = useMemo(() => {
        const mainAccount = item?.relatedAccounts?.find((ra) =>
            ['income', 'expense', 'transfer_out'].includes(ra.relation),
        );
        return [mainAccount?.account || null, item.category || null, mainAccount?.relation || null];
    }, [item]);

    const installmentsNumber = useMemo(() => {
        const installmentsGroup = item?.transactionGroups.find((g) => g.type === 'installments');
        if (!installmentsGroup) return 1;
        return installmentsGroup.transactionsCount;
    }, [item]);

    return (
        <List.Item
            onMouseEnter={() => setShowContext(true)}
            onMouseLeave={() => setShowContext(false)}
            style={{ cursor: 'pointer' }}
            onClick={() =>
                setSelectedTransaction({
                    transaction: item,
                    action: 'details',
                })
            }>
            <List.Item.Meta
                style={{ position: 'relative' }}
                title={item.description}
                description={
                    <Space size="middle">
                        <Tooltip title="Conta">
                            <Space size="small" onClick={(e) => handleSelectAccount(e, account)}>
                                <BankOutlined />
                                <span>{account?.name}</span>
                            </Space>
                        </Tooltip>
                        <Tooltip title="Categoria">
                            <Space size="small" onClick={(e) => handleSelectCategory(e, category)}>
                                <FolderOutlined />
                                <span>{category?.name}</span>
                            </Space>
                        </Tooltip>
                        {installmentsNumber > 1 ? (
                            <Tooltip title="Lançamento parcelado">
                                <Space size="small">
                                    <UnorderedListOutlined />
                                    <span>Parcelado</span>
                                </Space>
                            </Tooltip>
                        ) : null}
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
                    {getTransactionTypeIcon(type)}
                </Space>
                <motion.div
                    layout
                    variants={contextMenuVariants}
                    initial="hidden"
                    animate={showContext ? 'visible' : 'hidden'}
                    exit="hidden">
                    <Space>
                        {!item.paid ? (
                            <Tooltip title="Desfazer">
                                <Button
                                    color="green"
                                    onClick={handlePayTransaction}
                                    type="text"
                                    icon={<CheckCircleOutlined />}
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip title="Efetivar">
                                <Button
                                    onClick={handlePayTransaction}
                                    type="text"
                                    icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                                />
                            </Tooltip>
                        )}
                        <Tooltip title="Remover">
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    remove(item.id);
                                }}
                                danger
                                type="text"
                                icon={<DeleteOutlined />}
                            />
                        </Tooltip>
                    </Space>
                </motion.div>
            </Space>
        </List.Item>
    );
}
