'use client';

import { Button, Card, Divider, Form, Input, Typography } from 'antd';
import { Rule } from 'antd/es/form';
import React from 'react';
const { Title } = Typography;

const rules: { [key: string]: Rule[] } = {
    name: [
        {
            required: true,
            message: 'Por favor informe seu nome',
        },
    ],
    email: [
        {
            type: 'email',
            message: 'Por favor informe um e-mail válido',
        },
        {
            required: true,
            message: 'Por favor informe seu e-mail',
        },
    ],
    password: [
        {
            required: true,
            message: 'Por favor informe sua senha',
        },
    ],
};

export default function Register() {
    const [form] = Form.useForm();
    return (
        <Card>
            <Title level={2}>Cadastro</Title>
            <Divider />
            <Form form={form} layout="vertical">
                <Form.Item name="name" label="Nome" rules={rules.name}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="E-mail" rules={rules.email}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Senha" rules={rules.password}>
                    <Input type="password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Entrar
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
