import React from 'react';
import { Wrapper } from './styles';
import { TransactionDetailsProps } from './types';
import { Button, Drawer, Flex, Popconfirm, Space } from 'antd';

export default function TransactionDetails(props: TransactionDetailsProps) {
    const { transaction, open, onClose } = props;

    function handleCancel() {
        onClose();
    }

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
            }></Drawer>
    );
}
