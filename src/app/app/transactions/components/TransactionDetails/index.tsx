import React, { useMemo } from 'react';
import { Wrapper } from './styles';
import { TransactionDetailsProps } from './types';
import { Button, Descriptions, Drawer, Flex, Popconfirm, Space } from 'antd';
import dayjs from 'dayjs';
import { transactionTypeTranslator } from '@/lib/transactionTypeTranslator';

export default function TransactionDetails(props: TransactionDetailsProps) {
    const { transaction, open, onClose } = props;

    function handleCancel() {
        onClose();
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

    return (
        <Drawer
            title="Detalhes da transação"
            open={open}
            onClose={handleCancel}
            width={600}
            footer={
                <Flex justify="end">
                    <Space>
                        <Popconfirm
                            title="Você tem certeza?"
                            description="Você tem certeza que deseja remover esta transação?"
                            // onConfirm={() => remove(record.id)}
                            // okButtonProps={{ loading: isRemoving }}>
                        >
                            <Button danger>Remover</Button>
                        </Popconfirm>
                        <Button
                            type="primary"
                            onClick={() => {
                                // setSelectedTransaction(record);
                                // setOpen(true);
                            }}>
                            Editar
                        </Button>
                    </Space>
                </Flex>
            }>
            {transaction && (
                <Descriptions layout="vertical" bordered>
                    <Descriptions.Item span={3} label="Descricão">
                        {transaction.description}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tipo">{transactionTypeTranslator(accountRelation)}</Descriptions.Item>
                    <Descriptions.Item label="Data">{dayjs(transaction.date).format('DD/MM/YYYY')}</Descriptions.Item>
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
            )}
        </Drawer>
    );
}
