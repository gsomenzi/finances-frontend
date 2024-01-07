import React, { useState } from 'react';
import { CreditCardsViewProps } from './types';
import { CreditCard } from '@/types/CreditCard';
import { Flex, Typography, Input, FloatButton, Table, Space, Button, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddEditForm from './components/AddEditForm';
const { Search } = Input;

export default function CreditCardsView(props: CreditCardsViewProps) {
    const { creditCards, isLoading, isRemoving, page, limit, total, remove, onPageChange, onSizeChange, onSearch } =
        props;
    const [open, setOpen] = useState(false);
    const [selectedCreditCard, setSelectedCreditCard] = useState<CreditCard | null>(null);

    return (
        <div>
            <Flex justify="space-between" align="center">
                <Typography.Title level={2}>Contas</Typography.Title>
                <Search placeholder="Pesquisa" onSearch={onSearch} style={{ width: 200 }} />
            </Flex>
            <FloatButton
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                    setSelectedCreditCard(null);
                    setOpen(true);
                }}
            />
            <AddEditForm open={open} onClose={() => setOpen(false)} creditCard={selectedCreditCard} />
            <Table
                dataSource={creditCards}
                loading={isLoading}
                rowKey={(row) => row.id}
                columns={[
                    {
                        title: 'Nome',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: 'Limite',
                        dataIndex: 'limit',
                        key: 'limit',
                    },
                    {
                        title: 'Dia de fechamento',
                        dataIndex: 'closingDay',
                        key: 'closingDay',
                    },
                    {
                        title: 'Dia de vencimento',
                        dataIndex: 'dueDay',
                        key: 'dueDay',
                    },
                    {
                        title: 'Moeda',
                        dataIndex: 'currency',
                        key: 'currency',
                    },
                    {
                        title: 'Ações',
                        align: 'right',
                        width: 1,
                        render: (value, record) => (
                            <Space>
                                <Button
                                    type="text"
                                    onClick={() => {
                                        setSelectedCreditCard(record);
                                        setOpen(true);
                                    }}>
                                    Editar
                                </Button>
                                <Popconfirm
                                    title="Você tem certeza?"
                                    description="Você tem certeza que deseja remover este cartão?"
                                    onConfirm={() => remove(record.id)}
                                    okButtonProps={{ loading: isRemoving }}>
                                    <Button type="text" danger>
                                        Remover
                                    </Button>
                                </Popconfirm>
                            </Space>
                        ),
                    },
                ]}
                pagination={{
                    defaultCurrent: page,
                    defaultPageSize: limit,
                    total: total,
                    onChange: onPageChange,
                    showSizeChanger: true,
                    onShowSizeChange: (_, newSize) => onSizeChange(newSize),
                }}
            />
        </div>
    );
}
