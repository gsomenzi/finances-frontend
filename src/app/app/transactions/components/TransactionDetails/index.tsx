import React, { useMemo } from 'react';
import { TransactionDetailsProps } from './types';
import { Button, Descriptions, Divider, Drawer, Flex, Popconfirm, Space, Tag, Typography } from 'antd';
import { transactionTypeTranslator } from '@/lib/transactionTypeTranslator';
import dayjs from 'dayjs';
import { useMutation, useQueryClient } from 'react-query';
import TransactionModel from '@/models/TransactionModel';
import { useConfirm } from '@/providers/ConfirmProvider';
import { useTransaction } from '../../providers/TransactionProvider';

export default function TransactionDetails(props: TransactionDetailsProps) {
    const {
        selectedTransaction: { transaction, action },
        setSelectedTransaction,
    } = useTransaction();
    const { onEdit } = props;
    const { confirm } = useConfirm();
    const queryClient = useQueryClient();
    const transactionModel = new TransactionModel();

    function handleClose() {
        setSelectedTransaction({
            transaction: null,
            action: null,
        });
    }

    const accountName = useMemo(() => {
        if (transaction?.relatedAccounts && transaction.relatedAccounts.length > 0) {
            return transaction?.relatedAccounts[0].account.name;
        } else {
            return '-';
        }
    }, [transaction]);

    const accountRelation = useMemo(() => {
        if (transaction?.relatedAccounts && transaction.relatedAccounts.length > 0) {
            return transaction?.relatedAccounts[0].relation;
        } else {
            return '-';
        }
    }, [transaction]);

    const { mutate: remove, isLoading: isRemoving } = useMutation((id: number) => transactionModel.delete(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('transactions');
            handleClose();
        },
    });

    function handleEdit() {
        if (transaction && onEdit) {
            onEdit(transaction);
        }
    }

    function handleRemove() {
        confirm({
            title: 'Voce tem certeza?',
            description: 'Você tem certeza que deseja remover esta transação?',
            onConfirm: () => {
                if (transaction) {
                    remove(transaction.id);
                }
            },
        });
    }

    return (
        <Drawer
            title="Detalhes da transação"
            open={!!transaction && action === 'details'}
            onClose={handleClose}
            width={600}
            footer={
                transaction && (
                    <Flex justify="end">
                        <Space>
                            <Button loading={isRemoving} onClick={handleRemove} danger>
                                Remover
                            </Button>
                            <Button type="primary" onClick={handleEdit}>
                                Editar
                            </Button>
                        </Space>
                    </Flex>
                )
            }>
            {transaction && (
                <>
                    <Descriptions bordered style={{ marginBottom: '1rem' }} column={1}>
                        <Descriptions.Item span={3} label="Descricão">
                            {transaction.description}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tipo">{transactionTypeTranslator(accountRelation)}</Descriptions.Item>
                        <Descriptions.Item label="Data">
                            {dayjs(transaction.date).format('DD/MM/YYYY')}
                        </Descriptions.Item>
                        <Descriptions.Item label="Valor">
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(Number(transaction.value))}
                        </Descriptions.Item>
                        <Descriptions.Item label="Conta">{accountName}</Descriptions.Item>
                        <Descriptions.Item span={2} label="Categoria">
                            {transaction.category?.name}
                        </Descriptions.Item>
                        {transaction.notes && (
                            <Descriptions.Item span={3} label="Observações">
                                {transaction.notes}
                            </Descriptions.Item>
                        )}
                    </Descriptions>
                    {transaction.tags && transaction.tags.length > 0 && (
                        <>
                            <Space wrap>
                                <Typography.Text>Tags:</Typography.Text>
                                {transaction.tags.map((tag) => (
                                    <Tag key={tag.id}>{tag.name}</Tag>
                                ))}
                            </Space>
                        </>
                    )}
                </>
            )}
        </Drawer>
    );
}
