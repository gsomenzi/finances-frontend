import React from 'react';
import { TransactionListItemContentProps } from './types';
import { Button, Space, Tag, Tooltip, Typography } from 'antd';
import { CheckCircleOutlined, CheckCircleTwoTone, DeleteOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from 'react-query';
import TransactionModel from '@/models/TransactionModel';
import { useTransaction } from '../../../../providers/TransactionProvider';
import { useFeedback } from '@/providers/FeedbackProvider';
import { useTransactionDetails } from '../../providers/TransactionDetailsProvider';

const contextMenuVariants = {
    hidden: { opacity: 0, scale: 0, width: 0 },
    visible: { opacity: 1, scale: 1, width: 'auto' },
};

export default function TransactionListItemContent(props: TransactionListItemContentProps) {
    const transactionModel = new TransactionModel();
    const { showMessage, showNotification } = useFeedback();
    const { selectedTransactions } = useTransaction();
    const { isGrouped, group, transaction, transactionTypeIcon, showContext } = useTransactionDetails();
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
        payTransaction.mutate(transaction.id);
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
                    }).format(
                        isGrouped
                            ? Number(
                                  group?.transactions?.reduce((acc, t) => {
                                      return acc + Number(t.value);
                                  }, 0),
                              )
                            : Number(transaction.value),
                    )}
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
                    {!transaction.paid ? (
                        <Tooltip title="Desfazer">
                            <Button
                                color="green"
                                onClick={handlePayTransaction}
                                type="text"
                                icon={<CheckCircleOutlined />}
                                disabled={selectedTransactions.length > 0}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip title="Efetivar">
                            <Button
                                onClick={handlePayTransaction}
                                type="text"
                                icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                                disabled={selectedTransactions.length > 0}
                            />
                        </Tooltip>
                    )}
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
