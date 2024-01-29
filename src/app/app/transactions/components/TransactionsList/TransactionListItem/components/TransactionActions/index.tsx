import React from 'react';
import { Button, Space, Tag, Tooltip, Typography } from 'antd';
import { CheckCircleOutlined, CheckCircleTwoTone, DeleteOutlined, UngroupOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from 'react-query';
import TransactionModel from '@/models/TransactionModel';
import { useTransaction } from '../../../../../providers/TransactionProvider';
import { useFeedback } from '@/providers/FeedbackProvider';
import { useTransactionDetails } from '../../providers/TransactionDetailsProvider';
import Show from '@/components/Show';
import TransactionGroupModel from '@/models/TransactionGroupModel';
import { useConfirm } from '@/providers/ConfirmProvider';

const contextMenuVariants = {
    hidden: { opacity: 0, scale: 0, width: 0 },
    visible: { opacity: 1, scale: 1, width: 'auto' },
};

export default function TransactionActions() {
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

    function handleRemoveTransaction(e: any) {
        e.preventDefault();
        e.stopPropagation();
        confirm({
            title: 'Remover transação',
            description: 'Tem certeza que deseja remover esta transação?',
            onConfirm: () => {
                remove(transaction.id);
            },
            onCancel: () => {},
        });
    }

    return (
        <Space size="middle">
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
                            onClick={handleRemoveTransaction}
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
