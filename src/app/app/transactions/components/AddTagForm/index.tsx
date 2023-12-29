import React from 'react';
import { Wrapper } from './styles';
import { AddTagFormProps } from './types';
import { Button, Drawer, Flex, Form, Input, Radio, Space } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import TagModel from '@/models/TagModel';

export default function AddTagForm(props: AddTagFormProps) {
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const { open, onClose } = props;
    const tagModel = new TagModel();

    const addTag = useMutation(
        (tagData) => {
            return tagModel.create(tagData);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('tags');
                onClose();
            },
            onError: (e: any) => {
                console.log(e);
            },
        },
    );

    function handleCancel() {
        onClose();
    }

    function handleSubmit(values: any) {
        addTag.mutate(values);
    }

    return (
        <Drawer
            title="Criar tag"
            open={open}
            onClose={handleCancel}
            footer={
                <Flex justify="end">
                    <Space>
                        <Button onClick={handleCancel}>Cancelar</Button>
                        <Button type="primary" onClick={() => form.submit()} loading={false}>
                            Salvar
                        </Button>
                    </Space>
                </Flex>
            }>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Drawer>
    );
}
