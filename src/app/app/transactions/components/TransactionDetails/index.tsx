import React, { useMemo } from 'react';
import { TransactionDetailsProps } from './types';
import { Button, Descriptions, Divider, Drawer, Flex, Popconfirm, Space, Table, Tag, Typography } from 'antd';
import { transactionTypeTranslator } from '@/lib/transactionTypeTranslator';
import dayjs from 'dayjs';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import TransactionModel from '@/models/TransactionModel';
import { useConfirm } from '@/providers/ConfirmProvider';
import { useTransaction } from '../../providers/TransactionProvider';

export default function TransactionDetails(props: TransactionDetailsProps) {
    const {
        selectedTransaction: { transaction, action },
        setSelectedTransaction,
    } = useTransaction();
    const { confirm } = useConfirm();
    const queryClient = useQueryClient();
    const transactionModel = new TransactionModel();

    const { data: transactionDetails, isLoading } = useQuery(
        ['transactions', transaction?.id],
        () => transactionModel.findOne(transaction?.id || 0),
        {
            enabled: !!transaction?.id,
        },
    );

    const [installmentsNumber, installments] = useMemo(() => {
        const installmentsGroup = transactionDetails?.transactionGroups.find((g) => g.type === 'installments');
        if (!installmentsGroup) return [1, []];
        return [
            installmentsGroup.transactionsCount,
            installmentsGroup.transactions?.sort((a, b) => a.date.localeCompare(b.date)) || [],
        ];
    }, [transactionDetails]);

    function handleClose() {
        setSelectedTransaction({
            transaction: null,
            action: null,
        });
    }

    const [accountName, accountRelation] = useMemo(() => {
        const mainAccount = transaction?.relatedAccounts?.find((ra) =>
            ['income', 'expense', 'transfer_out'].includes(ra.relation),
        );
        if (!mainAccount) {
            return ['-', '-'];
        }
        return [mainAccount.account.name, mainAccount.relation];
    }, [transaction]);

    const { mutate: remove, isLoading: isRemoving } = useMutation((id: number) => transactionModel.delete(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('transactions');
            handleClose();
        },
    });

    function handleEdit() {
        if (transaction) {
            setSelectedTransaction({
                transaction,
                action: 'edit',
            });
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
                    <Typography.Title level={5}>Detalhes:</Typography.Title>
                    <Descriptions bordered column={1}>
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
                        <Descriptions.Item label="Parcelas">{installmentsNumber}</Descriptions.Item>
                    </Descriptions>
                    {transaction.tags && transaction.tags.length > 0 && (
                        <>
                            <Typography.Title level={5}>Tags:</Typography.Title>
                            <Space wrap>
                                {transaction.tags.map((tag) => (
                                    <Tag key={tag.id}>{tag.name}</Tag>
                                ))}
                            </Space>
                        </>
                    )}
                    {installmentsNumber > 1 && (
                        <Flex vertical gap={8}>
                            <Typography.Title level={5}>Parcelas:</Typography.Title>
                            <Table
                                dataSource={installments}
                                pagination={false}
                                rowKey={(t) => t.id}
                                columns={[
                                    {
                                        title: 'Parcela',
                                        dataIndex: 'key',
                                        width: 1,
                                        render: (_, record, index) => (
                                            <Typography.Text strong={record.id === transaction.id}>
                                                {index + 1}
                                            </Typography.Text>
                                        ),
                                    },
                                    {
                                        title: 'Data',
                                        dataIndex: 'date',
                                        key: 'date',
                                        render: (value, record) => (
                                            <Typography.Text strong={record.id === transaction.id}>
                                                {dayjs(value).format('DD/MM/YYYY')}
                                            </Typography.Text>
                                        ),
                                    },
                                    {
                                        title: 'Valor',
                                        dataIndex: 'value',
                                        key: 'value',
                                        render: (value, record) => (
                                            <Typography.Text strong={record.id === transaction.id}>
                                                {Intl.NumberFormat('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                }).format(Number(value))}
                                            </Typography.Text>
                                        ),
                                    },
                                    {
                                        title: 'Paga',
                                        dataIndex: 'paid',
                                        key: 'paid',
                                        render: (value, record) => (
                                            <Typography.Text strong={record.id === transaction.id}>
                                                {value ? 'Sim' : 'Não'}
                                            </Typography.Text>
                                        ),
                                    },
                                ]}
                            />
                        </Flex>
                    )}
                </>
            )}
        </Drawer>
    );
}
