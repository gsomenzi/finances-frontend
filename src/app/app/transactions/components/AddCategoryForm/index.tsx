import React from 'react';
import { Wrapper } from './styles';
import { AddCategoryFormProps } from './types';
import { Button, Drawer, Flex, Form, Input, Radio, Space } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import CategoryModel from '@/models/CategoryModel';

export default function AddCategoryForm(props: AddCategoryFormProps) {
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const { open, onClose } = props;
    const categoryModel = new CategoryModel();

    const addCategory = useMutation(
        (categoryData) => {
            return categoryModel.create(categoryData);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('categories');
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
        addCategory.mutate(values);
    }

    return (
        <Drawer
            title="Criar categoria"
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
            <Form initialValues={{ destination: 'expense' }} form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item name="destination" label="Tipo" rules={[{ required: true }]}>
                    <Radio.Group
                        options={[
                            { label: 'Receita', value: 'income' },
                            { label: 'Despesa', value: 'expense' },
                        ]}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </Form.Item>
                <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Drawer>
    );
}
