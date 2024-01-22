import React from 'react';
import { TransactionListItemContentProps } from './types';
import { Button, Space, Tag, Tooltip, Typography } from 'antd';
import { CheckCircleOutlined, CheckCircleTwoTone, DeleteOutlined, UngroupOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from 'react-query';
import TransactionModel from '@/models/TransactionModel';
import { useTransaction } from '../../../../providers/TransactionProvider';
import { useFeedback } from '@/providers/FeedbackProvider';
import { useTransactionDetails } from '../../providers/TransactionDetailsProvider';
import Show from '@/components/Show';
import TransactionGroupModel from '@/models/TransactionGroupModel';
import { useConfirm } from '@/providers/ConfirmProvider';

const contextMenuVariants = {
    hidden: { opacity: 0, scale: 0, width: 0 },
    visible: { opacity: 1, scale: 1, width: 'auto' },
};

export default function TransactionListItemContent(props: TransactionListItemContentProps) {
    const transactionModel = new TransactionModel();
    const transactionGroupModel = new TransactionGroupModel();
    const { showMessage, showNotification } = useFeedback();
    const { confirm } = useConfirm();
    const { selectedTransactions } = useTransaction();
    const { transaction, transactionTypeIcon, showContext } = useTransactionDetails();
    const queryClient = useQueryClient();

    const { mutate: remove } = useMutation((id: number) => transactionModel.delete(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('transactions');
        },
        onError: (e: any) => {
            console.log(e);
            showNotification('Erro', e?.response?.data?.message || 'Erro ao remover a transação', {
                type: 'error',
            });
        },
    });

    const { mutate: ungroup } = useMutation((id: number) => transactionGroupModel.delete(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('transactions');
        },
        onError: (e: any) => {
            console.log(e);
            showNotification('Erro', e?.response?.data?.message || 'Erro ao desagrupar as transações', {
                type: 'error',
            });
        },
    });

    const { mutate: payTransaction } = useMutation(
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
        payTransaction(transaction.id);
    }

    return (
        <Space size="middle">
            {transaction.tags && transaction.tags.length > 0 ? (
                <Space size="small">
                    {transaction.tags.map((tag) => (
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
                    }).format(Number(transaction.value))}
                </Typography>
                {transactionTypeIcon}
            </Space>
            <motion.div
                layout
                variants={contextMenuVariants}
                initial="hidden"
                animate={showContext || selectedTransactions.includes(transaction) ? 'visible' : 'hidden'}
                exit="hidden">
                <Space>
                    <Show when={transaction.paid}>
                        <Tooltip title="Desfazer">
                            <Button
                                color="green"
                                onClick={handlePayTransaction}
                                type="text"
                                icon={<CheckCircleOutlined />}
                                disabled={selectedTransactions.length > 0}
                            />
                        </Tooltip>
                    </Show>
                    <Show when={!transaction.paid}>
                        <Tooltip title="Efetivar">
                            <Button
                                onClick={handlePayTransaction}
                                type="text"
                                icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                                disabled={selectedTransactions.length > 0}
                            />
                        </Tooltip>
                    </Show>
                    <Tooltip title="Remover">
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                remove(transaction.id);
                            }}
                            danger
                            type="text"
                            icon={<DeleteOutlined />}
                            disabled={selectedTransactions.length > 0}
                        />
                    </Tooltip>
                </Space>
            </motion.div>
        </Space>
    );
}