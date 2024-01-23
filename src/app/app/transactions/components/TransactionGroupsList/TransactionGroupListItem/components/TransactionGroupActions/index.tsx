import React, { useMemo } from 'react';
import { Button, Space, Tag, Tooltip, Typography } from 'antd';
import { CheckCircleOutlined, CheckCircleTwoTone, DeleteOutlined, UngroupOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from 'react-query';
import TransactionModel from '@/models/TransactionModel';
import { useTransaction } from '../../../../../providers/TransactionProvider';
import { useFeedback } from '@/providers/FeedbackProvider';
import { useTransactionGroupDetails } from '../../providers/TransactionGroupDetailsProvider';
import Show from '@/components/Show';
import TransactionGroupModel from '@/models/TransactionGroupModel';
import { useConfirm } from '@/providers/ConfirmProvider';

const contextMenuVariants = {
    hidden: { opacity: 0, scale: 0, width: 0 },
    visible: { opacity: 1, scale: 1, width: 'auto' },
};

export default function TransactionGroupActions() {
    const transactionModel = new TransactionModel();
    const transactionGroupModel = new TransactionGroupModel();
    const { showMessage, showNotification } = useFeedback();
    const { confirm } = useConfirm();
    const { selectedTransactions } = useTransaction();
    const { transactionGroup, showContext } = useTransactionGroupDetails();
    const queryClient = useQueryClient();

    const value = useMemo(() => {
        return transactionGroup.transactions.reduce((prev, curr) => {
            return prev + Number(curr.value);
        }, 0);
    }, [transactionGroup]);

    return (
        <Space size="middle">
            <Space size="small">
                <Typography>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(Number(value))}
                </Typography>
            </Space>
            <motion.div
                layout
                variants={contextMenuVariants}
                initial="hidden"
                animate={showContext ? 'visible' : 'hidden'}
                exit="hidden">
                <Space>
                    <Tooltip title="Remover">
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
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
