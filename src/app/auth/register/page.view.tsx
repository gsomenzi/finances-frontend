import React from 'react';
import { RegisterViewProps } from './types';
import { Button, Card, Divider, Form, Input, Typography } from 'antd';
import { Rule } from 'antd/es/form';
import ErrorAlert from '@/components/ErrorAlert';
import Link from 'next/link';

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

export default function RegisterView(props: RegisterViewProps) {
    const [form] = Form.useForm();
    const { errorMessage, registering } = props;
    return (
        <div>
            <Card>
                <Title level={2}>Cadastro</Title>
                <Divider />
                <Form form={form} onFinish={() => props.register(form.getFieldsValue())} layout="vertical">
                    <Form.Item name="name" label="Nome" rules={rules.name}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="E-mail" rules={rules.email}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Senha" rules={rules.password}>
                        <Input type="password" />
                    </Form.Item>
                    {errorMessage && (
                        <Form.Item>
                            <ErrorAlert show={!!errorMessage} title={errorMessage} />
                        </Form.Item>
                    )}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={registering}>
                            Cadastrar
                        </Button>
                    </Form.Item>
                </Form>
                <Link href="/auth/login">Faça login</Link>
            </Card>
        </div>
    );
}
